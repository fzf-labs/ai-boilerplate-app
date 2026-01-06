<script lang="ts" setup>
import type { IAppVersion, ICacheInfo } from '@/api/types/user'
import { checkVersion, clearCache, getCacheInfo } from '@/api/user'

definePage({
  style: {
    navigationBarTitleText: '通用设置',
  },
})

// 缓存信息
const cacheInfo = ref<ICacheInfo | null>(null)
// 版本信息
const versionInfo = ref<IAppVersion | null>(null)
// 当前语言
const currentLanguage = ref('zh-CN')

// 语言选项
const languageOptions = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
]

// 菜单列表
const menuList = [
  {
    title: '语言切换',
    icon: '🌐',
    action: 'changeLanguage',
    showValue: true,
    value: '简体中文',
  },
  {
    title: '清除缓存',
    icon: '🗑️',
    action: 'clearCache',
    showValue: true,
    value: '0 MB',
  },
  {
    title: '隐私协议',
    icon: '📄',
    action: 'privacy',
    showValue: false,
  },
  {
    title: '用户协议',
    icon: '📋',
    action: 'terms',
    showValue: false,
  },
  {
    title: '关于我们',
    icon: 'ℹ️',
    action: 'about',
    showValue: false,
  },
  {
    title: '版本更新',
    icon: '🔄',
    action: 'checkVersion',
    showValue: true,
    value: 'v1.0.0',
  },
]

/**
 * 获取缓存信息
 */
async function fetchCacheInfo() {
  try {
    const res = await getCacheInfo()
    cacheInfo.value = res
    const cacheItem = menuList.find(item => item.action === 'clearCache')
    if (cacheItem) {
      cacheItem.value = res.sizeText
    }
  }
  catch (error) {
    console.error('获取缓存信息失败:', error)
  }
}

/**
 * 检查版本更新
 */
async function fetchVersionInfo() {
  try {
    const res = await checkVersion()
    versionInfo.value = res
    const versionItem = menuList.find(item => item.action === 'checkVersion')
    if (versionItem) {
      versionItem.value = `v${res.currentVersion}`
    }
  }
  catch (error) {
    console.error('检查版本失败:', error)
  }
}

/**
 * 菜单点击
 */
function handleMenuClick(action: string) {
  switch (action) {
    case 'changeLanguage':
      showLanguageDialog()
      break
    case 'clearCache':
      handleClearCache()
      break
    case 'privacy':
      uni.navigateTo({
        url: '/pages-fg/webview/index?url=https://example.com/privacy',
      })
      break
    case 'terms':
      uni.navigateTo({
        url: '/pages-fg/webview/index?url=https://example.com/terms',
      })
      break
    case 'about':
      showAboutDialog()
      break
    case 'checkVersion':
      handleCheckVersion()
      break
  }
}

/**
 * 语言切换对话框
 */
function showLanguageDialog() {
  uni.showActionSheet({
    itemList: languageOptions.map(item => item.label),
    success: (res) => {
      const selected = languageOptions[res.tapIndex]
      currentLanguage.value = selected.value
      const languageItem = menuList.find(item => item.action === 'changeLanguage')
      if (languageItem) {
        languageItem.value = selected.label
      }
      uni.showToast({
        title: '切换成功',
        icon: 'success',
      })
    },
  })
}

/**
 * 清除缓存
 */
async function handleClearCache() {
  uni.showModal({
    title: '提示',
    content: '确定要清除缓存吗？',
    success: async (res) => {
      if (res.confirm) {
        try {
          await clearCache()
          uni.showToast({
            title: '清除成功',
            icon: 'success',
          })
          fetchCacheInfo()
        }
        catch (error) {
          console.error('清除缓存失败:', error)
        }
      }
    },
  })
}

/**
 * 关于我们对话框
 */
function showAboutDialog() {
  uni.showModal({
    title: '关于我们',
    content: '这是一款基于 UniApp 开发的移动应用\n\n版本号：v1.0.0\n\n联系方式：support@example.com',
    showCancel: false,
  })
}

/**
 * 检查版本更新
 */
async function handleCheckVersion() {
  try {
    const res = await checkVersion()
    if (res.hasUpdate) {
      uni.showModal({
        title: '发现新版本',
        content: `最新版本：v${res.latestVersion}\n\n${res.updateDesc || ''}`,
        confirmText: '立即更新',
        success: (modalRes) => {
          if (modalRes.confirm && res.downloadUrl) {
            // 跳转到下载页面
            // #ifdef H5
            window.open(res.downloadUrl)
            // #endif
            // #ifndef H5
            uni.navigateTo({
              url: `/pages-fg/webview/index?url=${encodeURIComponent(res.downloadUrl)}`,
            })
            // #endif
          }
        },
      })
    }
    else {
      uni.showToast({
        title: '已是最新版本',
        icon: 'success',
      })
    }
  }
  catch (error) {
    console.error('检查版本失败:', error)
  }
}

onLoad(() => {
  fetchCacheInfo()
  fetchVersionInfo()
})
</script>

<template>
  <view class="settings-container">
    <wd-cell-group>
      <wd-cell
        v-for="item in menuList"
        :key="item.title"
        :title="item.title"
        :icon="item.icon"
        :value="item.showValue ? item.value : ''"
        is-link
        @click="handleMenuClick(item.action)"
      />
    </wd-cell-group>
  </view>
</template>

<style lang="scss" scoped>
.settings-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}
</style>
