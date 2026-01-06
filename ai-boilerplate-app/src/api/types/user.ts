/**
 * 用户相关接口类型定义
 */

/**
 * 用户信息（扩展版）
 */
export interface IUserProfile {
  /** 用户ID */
  userId: number
  /** 用户名 */
  username: string
  /** 昵称 */
  nickname: string
  /** 头像 */
  avatar: string
  /** 性别：1-男，2-女，0-保密 */
  gender: number
  /** 生日 */
  birthday?: string
  /** 手机号（脱敏） */
  phone?: string
  /** 邮箱（脱敏） */
  email?: string
  /** 地址 */
  address?: string
  /** 会员等级：0-普通会员，1-VIP */
  memberLevel: number
  /** 积分 */
  points: number
  /** 余额 */
  balance: number
}

/**
 * 更新用户信息请求
 */
export interface IUpdateUserProfileReq {
  /** 昵称 */
  nickname?: string
  /** 头像 */
  avatar?: string
  /** 性别 */
  gender?: number
  /** 生日 */
  birthday?: string
  /** 手机号 */
  phone?: string
  /** 邮箱 */
  email?: string
  /** 地址 */
  address?: string
}

/**
 * 修改密码请求
 */
export interface IChangePasswordReq {
  /** 旧密码 */
  oldPassword: string
  /** 新密码 */
  newPassword: string
  /** 确认新密码 */
  confirmPassword: string
}

/**
 * 绑定手机号请求
 */
export interface IBindPhoneReq {
  /** 手机号 */
  phone: string
  /** 验证码 */
  code: string
}

/**
 * 发送验证码请求
 */
export interface ISendCodeReq {
  /** 手机号 */
  phone: string
}

/**
 * 注销账号请求
 */
export interface IDeleteAccountReq {
  /** 密码 */
  password: string
}

/**
 * 缓存信息
 */
export interface ICacheInfo {
  /** 缓存大小（字节） */
  size: number
  /** 缓存大小（格式化） */
  sizeText: string
}

/**
 * 应用版本信息
 */
export interface IAppVersion {
  /** 当前版本号 */
  currentVersion: string
  /** 最新版本号 */
  latestVersion: string
  /** 是否有新版本 */
  hasUpdate: boolean
  /** 更新说明 */
  updateDesc?: string
  /** 下载链接 */
  downloadUrl?: string
}
