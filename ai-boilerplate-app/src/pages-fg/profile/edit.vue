<script lang="ts" setup>
import type { IUpdateUserProfileReq, IUserProfile } from '@/api/types/user'
import { getUserProfile, updateUserProfile } from '@/api/user'

definePage({
  style: {
    navigationBarTitleText: '个人信息',
  },
})

// 用户信息
const userProfile = ref<IUserProfile | null>(null)
// 表单数据
const formData = ref<IUpdateUserProfileReq>({
  nickname: '',
  avatar: '',
  gender: 0,
  birthday: '',
  phone: '',
  email: '',
  address: '',
})
// 性别选项
const genderOptions = [
  { label: '保密', value: 0 },
  { label: '男', value: 1 },
  { label: '女', value: 2 },
]
// 显示性别选择器
const showGenderPicker = ref(false)
// 显示日期选择器
const showDatePicker = ref(false)

/**
 * 获取用户信息
 */
async function fetchUserProfile() {
  try {
    const res = await getUserProfile()
    userProfile.value = res
    formData.value = {
      nickname: res.nickname,
      avatar: res.avatar,
      gender: res.gender,
      birthday: res.birthday,
      phone: res.phone,
      email: res.email,
      address: res.address,
    }
  }
  catch (error) {
    console.error('获取用户信息失败:', error)
  }
}

/**
 * 选择头像
 */
function handleChooseAvatar() {
  uni.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['album', 'camera'],
    success: (res) => {
      const tempFilePath = res.tempFilePaths[0]
      // 这里应该上传到服务器，获取图片URL
      // 暂时使用本地路径
      formData.value.avatar = tempFilePath
    },
  })
}

/**
 * 性别选择确认
 */
function handleGenderConfirm({ selectedItems }: any) {
  if (selectedItems && selectedItems.length > 0) {
    formData.value.gender = selectedItems[0].value
  }
  showGenderPicker.value = false
}

/**
 * 日期选择确认
 */
function handleDateConfirm({ value }: any) {
  formData.value.birthday = value
  showDatePicker.value = false
}

/**
 * 保存用户信息
 */
async function handleSave() {
  try {
    // 验证昵称
    if (formData.value.nickname && (formData.value.nickname.length < 2 || formData.value.nickname.length > 20)) {
      uni.showToast({
        title: '昵称长度为2-20个字符',
        icon: 'none',
      })
      return
    }

    // 验证邮箱格式
    if (formData.value.email) {
      const emailReg = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/
      if (!emailReg.test(formData.value.email)) {
        uni.showToast({
          title: '邮箱格式不正确',
          icon: 'none',
        })
        return
      }
    }

    await updateUserProfile(formData.value)
    uni.showToast({
      title: '保存成功',
      icon: 'success',
    })

    setTimeout(() => {
      uni.navigateBack()
    }, 1500)
  }
  catch (error) {
    console.error('保存失败:', error)
  }
}

onLoad(() => {
  fetchUserProfile()
})
</script>

<template>
  <view class="profile-edit-container">
    <view v-if="userProfile">
      <!-- 头像 -->
      <wd-cell-group title="基本信息">
        <wd-cell title="头像" is-link @click="handleChooseAvatar">
          <image :src="formData.avatar || '/static/images/default-avatar.png'" class="avatar-preview" />
        </wd-cell>

        <!-- 昵称 -->
        <wd-cell title="昵称" is-link>
          <wd-input
            v-model="formData.nickname"
            placeholder="请输入昵称"
            :maxlength="20"
            clearable
          />
        </wd-cell>

        <!-- 性别 -->
        <wd-cell title="性别" is-link @click="showGenderPicker = true">
          <text>{{ genderOptions.find(item => item.value === formData.gender)?.label || '请选择' }}</text>
        </wd-cell>

        <!-- 生日 -->
        <wd-cell title="生日" is-link @click="showDatePicker = true">
          <text>{{ formData.birthday || '请选择' }}</text>
        </wd-cell>
      </wd-cell-group>

      <!-- 联系方式 -->
      <wd-cell-group title="联系方式">
        <!-- 手机号 -->
        <wd-cell title="手机号">
          <text class="disabled-text">{{ userProfile.phone || '未绑定' }}</text>
        </wd-cell>

        <!-- 邮箱 -->
        <wd-cell title="邮箱" is-link>
          <wd-input
            v-model="formData.email"
            placeholder="请输入邮箱"
            type="email"
            clearable
          />
        </wd-cell>

        <!-- 地址 -->
        <wd-cell title="地址" is-link>
          <wd-input
            v-model="formData.address"
            placeholder="请输入地址"
            clearable
          />
        </wd-cell>
      </wd-cell-group>
    </view>

    <!-- 保存按钮 -->
    <view class="save-section">
      <wd-button type="primary" block @click="handleSave">
        保存
      </wd-button>
    </view>

    <!-- 性别选择器 -->
    <wd-picker
      v-model="showGenderPicker"
      :columns="genderOptions"
      value-key="label"
      @confirm="handleGenderConfirm"
    />

    <!-- 日期选择器 -->
    <wd-datetime-picker
      v-model="showDatePicker"
      type="date"
      :value="formData.birthday"
      @confirm="handleDateConfirm"
    />
  </view>
</template>

<style lang="scss" scoped>
.profile-edit-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.disabled-text {
  color: #999;
}

.avatar-preview {
  width: 80rpx;
  height: 80rpx;
  border-radius: 40rpx;
}

.save-section {
  padding: 40rpx 32rpx;
}
</style>
