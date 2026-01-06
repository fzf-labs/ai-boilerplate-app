<script lang="ts" setup>
import type { IUserProfile } from '@/api/types/user'
import { storeToRefs } from 'pinia'
import { getUserProfile } from '@/api/user'
import { LOGIN_PAGE } from '@/router/config'
import { useUserStore } from '@/store'
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationBarTitleText: '我的',
  },
})

const userStore = useUserStore()
const tokenStore = useTokenStore()
const { userInfo } = storeToRefs(userStore)

// 用户详细信息
const userProfile = ref<IUserProfile | null>(null)

// 菜单列表
const menuList = [
  {
    title: '个人信息',
    icon: 'user',
    path: '/pages-fg/profile/edit',
    needLogin: true,
  },
  {
    title: '账号安全',
    icon: 'lock',
    path: '/pages-fg/security/index',
    needLogin: true,
  },
  {
    title: '隐私设置',
    icon: 'shield',
    path: '/pages-fg/privacy/index',
    needLogin: false,
  },
  {
    title: '通用设置',
    icon: 'setting',
    path: '/pages-fg/settings/index',
    needLogin: false,
  },
]

/**
 * 获取用户详细信息
 */
async function fetchUserProfile() {
  if (!tokenStore.hasLogin)
    return

  try {
    const res = await getUserProfile()
    userProfile.value = res
  }
  catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

/**
 * 登录
 */
async function handleLogin() {
  // #ifdef MP-WEIXIN
  await tokenStore.wxLogin()
  // #endif
  // #ifndef MP-WEIXIN
  uni.navigateTo({
    url: `${LOGIN_PAGE}`,
  })
  // #endif
}

/**
 * 退出登录
 */
function handleLogout() {
  uni.showModal({
    title: '提示',
    content: '确定要退出登录吗？',
    success: (res) => {
      if (res.confirm) {
        useTokenStore().logout()
        userProfile.value = null
        uni.showToast({
          title: '退出登录成功',
          icon: 'success',
        })
      }
    },
  })
}

/**
 * 菜单点击
 */
function handleMenuClick(item: typeof menuList[0]) {
  if (item.needLogin && !tokenStore.hasLogin) {
    uni.showToast({
      title: '请先登录',
      icon: 'none',
    })
    setTimeout(() => {
      handleLogin()
    }, 1500)
    return
  }

  uni.navigateTo({
    url: item.path,
  })
}

/**
 * 格式化会员等级
 */
function getMemberLevelText(level: number) {
  return level === 1 ? 'VIP' : '普通会员'
}

onLoad(() => {
  fetchUserProfile()
})
</script>

<template>
  <view class="me-container">
    <!-- 用户信息区 -->
    <view class="user-section">
      <!-- 未登录状态 -->
      <view v-if="!tokenStore.hasLogin" class="user-info-guest" @click="handleLogin">
        <image src="/static/images/default-avatar.png" class="user-avatar" />
        <view class="user-info">
          <text class="user-name">未登录</text>
          <text class="user-tip">点击登录/注册</text>
        </view>
        <wd-button type="primary" size="small" plain>
          登录
        </wd-button>
      </view>

      <!-- 已登录状态 -->
      <view v-else class="user-info-logged">
        <image
          :src="userInfo.avatar || '/static/images/default-avatar.png'"
          class="user-avatar"
        />
        <view class="user-info">
          <view class="user-name-row">
            <text class="user-name">{{ userInfo.nickname || userInfo.username }}</text>
            <wd-tag v-if="userProfile" type="warning" size="small">
              {{ getMemberLevelText(userProfile.memberLevel) }}
            </wd-tag>
          </view>
          <text class="user-id">ID: {{ userInfo.userId }}</text>
        </view>
      </view>

      <!-- 积分余额 -->
      <view v-if="tokenStore.hasLogin && userProfile" class="user-stats">
        <wd-grid :column="2" :border="false">
          <wd-grid-item @click="uni.navigateTo({ url: '/pages-fg/points/index' })">
            <view class="stat-item">
              <text class="stat-value">{{ userProfile.points }}</text>
              <text class="stat-label">积分</text>
            </view>
          </wd-grid-item>
          <wd-grid-item @click="uni.navigateTo({ url: '/pages-fg/balance/index' })">
            <view class="stat-item">
              <text class="stat-value">{{ userProfile.balance }}</text>
              <text class="stat-label">余额</text>
            </view>
          </wd-grid-item>
        </wd-grid>
      </view>
    </view>

    <!-- 菜单列表 -->
    <view class="menu-section">
      <wd-cell-group>
        <wd-cell
          v-for="item in menuList"
          :key="item.title"
          :title="item.title"
          :icon="item.icon"
          is-link
          @click="handleMenuClick(item)"
        />
      </wd-cell-group>
    </view>

    <!-- 退出登录按钮 -->
    <view v-if="tokenStore.hasLogin" class="logout-section">
      <wd-button type="error" block @click="handleLogout">
        退出登录
      </wd-button>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.me-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
}

.user-section {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  padding: 48rpx 32rpx 40rpx;
  color: #fff;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 400rpx;
    height: 400rpx;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    filter: blur(60rpx);
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -30%;
    left: -10%;
    width: 300rpx;
    height: 300rpx;
    background: rgba(255, 255, 255, 0.08);
    border-radius: 50%;
    filter: blur(50rpx);
  }
}

.user-info-guest,
.user-info-logged {
  display: flex;
  align-items: center;
  margin-bottom: 32rpx;
  gap: 24rpx;
  position: relative;
  z-index: 1;
}

.user-avatar {
  width: 128rpx;
  height: 128rpx;
  border-radius: 64rpx;
  border: 4rpx solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15);
}

.user-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.user-name-row {
  display: flex;
  align-items: center;
  gap: 16rpx;
}

.user-name {
  font-size: 38rpx;
  font-weight: 700;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.1);
}

.user-tip,
.user-id {
  font-size: 26rpx;
  opacity: 0.9;
  text-shadow: 0 1rpx 4rpx rgba(0, 0, 0, 0.1);
}

.user-stats {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20rpx);
  border-radius: 20rpx;
  overflow: hidden;
  border: 1rpx solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 1;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12rpx;
  padding: 32rpx 0;
  transition: all 0.3s ease;

  &:active {
    background: rgba(255, 255, 255, 0.1);
  }
}

.stat-value {
  font-size: 44rpx;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.15);
}

.stat-label {
  font-size: 26rpx;
  opacity: 0.9;
  color: #fff;
  font-weight: 500;
}

.menu-section {
  margin: 24rpx;

  :deep(.wd-cell-group) {
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
    background: #ffffff;
  }

  :deep(.wd-cell) {
    transition: background-color 0.2s ease;

    &:active {
      background-color: #f8fafc;
    }
  }

  :deep(.wd-cell__title) {
    font-size: 30rpx;
    font-weight: 500;
    color: #0f172a;
  }

  :deep(.wd-cell__icon) {
    color: #6366f1;
  }
}

.logout-section {
  padding: 24rpx 32rpx 48rpx;

  :deep(.wd-button) {
    border-radius: 16rpx;
    font-weight: 600;
    font-size: 32rpx;
    height: 96rpx;
    box-shadow: 0 4rpx 16rpx rgba(239, 68, 68, 0.2);
  }
}
</style>
