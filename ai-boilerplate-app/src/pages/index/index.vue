<script lang="ts" setup>
import type { IBannerItem, IContentItem } from '@/api/types/home'
import { getBannerList, getContentList } from '@/api/home'

defineOptions({
  name: 'Home',
})

definePage({
  type: 'home',
  style: {
    navigationBarTitleText: '首页',
  },
})

// 轮播图数据
const bannerList = ref<IBannerItem[]>([])
// 内容列表数据
const contentList = ref<IContentItem[]>([])
// 加载状态
const loading = ref(false)
// 分页参数
const page = ref(1)
const pageSize = 10
const total = ref(0)

/**
 * 获取轮播图数据
 */
async function fetchBannerList() {
  try {
    const res = await getBannerList()
    bannerList.value = res.list || []
  }
  catch (error) {
    console.error('获取轮播图失败:', error)
  }
}

/**
 * 获取内容列表
 */
async function fetchContentList(isRefresh = false) {
  if (loading.value)
    return

  loading.value = true
  try {
    if (isRefresh) {
      page.value = 1
    }

    const res = await getContentList({
      page: page.value,
      pageSize,
    })

    if (isRefresh) {
      contentList.value = res.list || []
    }
    else {
      contentList.value = [...contentList.value, ...(res.list || [])]
    }

    total.value = res.total || 0
  }
  catch (error) {
    console.error('获取内容列表失败:', error)
    uni.showToast({
      title: '加载失败',
      icon: 'none',
    })
  }
  finally {
    loading.value = false
  }
}

/**
 * 下拉刷新
 */
function onRefresh() {
  fetchBannerList()
  fetchContentList(true)
}

/**
 * 上拉加载更多
 */
function onLoadMore() {
  if (contentList.value.length >= total.value) {
    return
  }
  page.value++
  fetchContentList()
}

/**
 * 轮播图点击
 */
function handleBannerClick(item: IBannerItem) {
  if (item.linkUrl) {
    // 跳转到详情页或外部链接
    console.log('跳转到:', item.linkUrl)
  }
}

/**
 * 内容卡片点击
 */
function handleContentClick(item: IContentItem) {
  uni.navigateTo({
    url: `/pages/content/detail?id=${item.id}`,
  })
}

/**
 * 格式化时间
 */
function formatTime(time: string) {
  const now = Date.now()
  const publishTime = new Date(time).getTime()
  const diff = now - publishTime

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour

  if (diff < minute) {
    return '刚刚'
  }
  else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  }
  else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  }
  else if (diff < 7 * day) {
    return `${Math.floor(diff / day)}天前`
  }
  else {
    return time.split(' ')[0]
  }
}

onLoad(() => {
  fetchBannerList()
  fetchContentList(true)
})
</script>

<template>
  <view class="home-container">
    <!-- 轮播图 -->
    <view v-if="bannerList.length > 0" class="banner-section">
      <wd-swiper
        :list="bannerList"
        :autoplay="bannerList.length > 1 ? 4000 : 0"
        indicator-position="bottom-center"
        value-key="imageUrl"
        height="400rpx"
        @click="handleBannerClick"
      />
    </view>

    <!-- 内容列表 -->
    <z-paging
      ref="pagingRef"
      v-model="contentList"
      :auto="false"
      @query="fetchContentList"
      @on-refresh="onRefresh"
    >
      <view class="content-list">
        <wd-card
          v-for="item in contentList"
          :key="item.id"
          :title="item.title"
          :thumb="item.coverImage"
          @click="handleContentClick(item)"
        >
          <template #content>
            <view class="card-content">
              <text class="content-summary">{{ item.summary }}</text>
              <view class="content-meta">
                <text class="content-time">{{ formatTime(item.publishTime) }}</text>
                <view v-if="item.tags && item.tags.length > 0" class="content-tags">
                  <wd-tag
                    v-for="tag in item.tags"
                    :key="tag"
                    type="primary"
                    plain
                    size="small"
                  >
                    {{ tag }}
                  </wd-tag>
                </view>
              </view>
            </view>
          </template>
        </wd-card>
      </view>

      <!-- 空状态 -->
      <template #empty>
        <view class="empty-state">
          <text class="empty-text">暂无内容</text>
        </view>
      </template>
    </z-paging>
  </view>
</template>

<style lang="scss" scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
}

.banner-section {
  width: 100%;
  height: 400rpx;
  padding: 24rpx;
  box-sizing: border-box;

  :deep(.wd-swiper) {
    border-radius: 24rpx;
    overflow: hidden;
    box-shadow: 0 8rpx 32rpx rgba(0, 0, 0, 0.08);
  }
}

.content-list {
  padding: 0 24rpx 24rpx;
  display: flex;
  flex-direction: column;
  gap: 24rpx;

  :deep(.wd-card) {
    border-radius: 20rpx;
    overflow: hidden;
    box-shadow: 0 4rpx 16rpx rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
    background: #ffffff;
    border: none;

    &:active {
      transform: scale(0.98);
      box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.08);
    }
  }

  :deep(.wd-card__thumb) {
    border-radius: 16rpx;
    overflow: hidden;
  }

  :deep(.wd-card__title) {
    font-size: 32rpx;
    font-weight: 600;
    color: #0f172a;
    line-height: 1.4;
  }
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
  padding-top: 12rpx;
}

.content-summary {
  font-size: 28rpx;
  color: #64748b;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.content-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 8rpx;
  border-top: 1rpx solid #f1f5f9;
}

.content-time {
  font-size: 24rpx;
  color: #94a3b8;
  font-weight: 500;
}

.content-tags {
  display: flex;
  gap: 12rpx;
  flex-wrap: wrap;

  :deep(.wd-tag) {
    border-radius: 12rpx;
    font-weight: 500;
  }
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 160rpx 0;
}

.empty-text {
  font-size: 28rpx;
  color: #94a3b8;
  font-weight: 500;
}
</style>
