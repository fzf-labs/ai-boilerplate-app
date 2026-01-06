<script lang="ts" setup>
import type { IBindPhoneReq, IChangePasswordReq, IDeleteAccountReq } from '@/api/types/user'
import { bindPhone, changePassword, deleteAccount, sendVerifyCode } from '@/api/user'
import { useTokenStore } from '@/store/token'

definePage({
  style: {
    navigationBarTitleText: '账号安全',
  },
})

const tokenStore = useTokenStore()

// 菜单列表
const menuList = [
  {
    title: '修改密码',
    icon: '🔑',
    action: 'changePassword',
  },
  {
    title: '绑定手机号',
    icon: '📱',
    action: 'bindPhone',
  },
  {
    title: '注销账号',
    icon: '⚠️',
    action: 'deleteAccount',
  },
]

/**
 * 菜单点击
 */
function handleMenuClick(action: string) {
  switch (action) {
    case 'changePassword':
      showChangePasswordDialog()
      break
    case 'bindPhone':
      showBindPhoneDialog()
      break
    case 'deleteAccount':
      showDeleteAccountDialog()
      break
  }
}

/**
 * 修���密码对话框
 */
function showChangePasswordDialog() {
  const formData: IChangePasswordReq = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }

  uni.showModal({
    title: '修改密码',
    editable: true,
    placeholderText: '请输入旧密码',
    success: async (res) => {
      if (res.confirm && res.content) {
        formData.oldPassword = res.content

        uni.showModal({
          title: '修改密码',
          editable: true,
          placeholderText: '请输入新密码（6-20位）',
          success: async (res2) => {
            if (res2.confirm && res2.content) {
              formData.newPassword = res2.content

              // 验证密码格式
              if (formData.newPassword.length < 6 || formData.newPassword.length > 20) {
                uni.showToast({
                  title: '密码长度为6-20位',
                  icon: 'none',
                })
                return
              }

              uni.showModal({
                title: '修改密码',
                editable: true,
                placeholderText: '请确认新密码',
                success: async (res3) => {
                  if (res3.confirm && res3.content) {
                    formData.confirmPassword = res3.content

                    if (formData.newPassword !== formData.confirmPassword) {
                      uni.showToast({
                        title: '两次密码不一致',
                        icon: 'none',
                      })
                      return
                    }

                    try {
                      await changePassword(formData)
                      uni.showToast({
                        title: '修改成功',
                        icon: 'success',
                      })
                    }
                    catch (error) {
                      console.error('修改密码失败:', error)
                    }
                  }
                },
              })
            }
          },
        })
      }
    },
  })
}

/**
 * 绑定手机号对话框
 */
function showBindPhoneDialog() {
  const formData: IBindPhoneReq = {
    phone: '',
    code: '',
  }

  uni.showModal({
    title: '绑定手机号',
    editable: true,
    placeholderText: '请输入手机号',
    success: async (res) => {
      if (res.confirm && res.content) {
        formData.phone = res.content

        // 验证手机号格式
        const phoneReg = /^1[3-9]\d{9}$/
        if (!phoneReg.test(formData.phone)) {
          uni.showToast({
            title: '手机号格式不正确',
            icon: 'none',
          })
          return
        }

        // 发送验证码
        try {
          await sendVerifyCode({ phone: formData.phone })
          uni.showToast({
            title: '验证码已发送',
            icon: 'success',
          })

          uni.showModal({
            title: '绑定手机号',
            editable: true,
            placeholderText: '请输入验证码',
            success: async (res2) => {
              if (res2.confirm && res2.content) {
                formData.code = res2.content

                try {
                  await bindPhone(formData)
                  uni.showToast({
                    title: '绑定成功',
                    icon: 'success',
                  })
                }
                catch (error) {
                  console.error('绑定手机号失败:', error)
                }
              }
            },
          })
        }
        catch (error) {
          console.error('发送验证码失败:', error)
        }
      }
    },
  })
}

/**
 * 注销账号对话框
 */
function showDeleteAccountDialog() {
  uni.showModal({
    title: '注销账号',
    content: '注销后，您的所有数据将被永久删除，且无法恢复。确定要注销吗？',
    confirmText: '确定注销',
    confirmColor: '#ff4d4f',
    success: (res) => {
      if (res.confirm) {
        uni.showModal({
          title: '注销账号',
          editable: true,
          placeholderText: '请输入密码确认',
          success: async (res2) => {
            if (res2.confirm && res2.content) {
              const formData: IDeleteAccountReq = {
                password: res2.content,
              }

              try {
                await deleteAccount(formData)
                uni.showToast({
                  title: '注销成功',
                  icon: 'success',
                })

                // 退出登录
                setTimeout(() => {
                  tokenStore.logout()
                  uni.reLaunch({
                    url: '/pages/index/index',
                  })
                }, 1500)
              }
              catch (error) {
                console.error('注销账号失败:', error)
              }
            }
          },
        })
      }
    },
  })
}
</script>

<template>
  <view class="security-container">
    <wd-cell-group>
      <wd-cell
        v-for="item in menuList"
        :key="item.title"
        :title="item.title"
        :icon="item.icon"
        is-link
        @click="handleMenuClick(item.action)"
      />
    </wd-cell-group>

    <view class="tips-section">
      <wd-message-box type="info">
        <view class="tips-content">
          <text class="tips-title">安全提示</text>
          <text class="tips-text">• 定期修改密码可以提高账号安全性</text>
          <text class="tips-text">• 绑定手机号后可以通过手机号找回密码</text>
          <text class="tips-text">• 注销账号后数据将被永久删除，请谨慎操作</text>
        </view>
      </wd-message-box>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.security-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.tips-section {
  margin: 20rpx;
}

.tips-content {
  display: flex;
  flex-direction: column;
  gap: 12rpx;
}

.tips-title {
  font-size: 30rpx;
  font-weight: 600;
  color: #333;
  margin-bottom: 8rpx;
}

.tips-text {
  font-size: 26rpx;
  color: #666;
  line-height: 1.8;
}
</style>
