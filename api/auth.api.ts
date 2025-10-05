import type { ApiRequestRegister, ApiRequestResetPassword, ApiRequestSignIn, ApiRequestUpdatePassword, ApiResponseRegister, ApiResponseSignIn, User } from '@/types/interface/auth.interface'
/**
 * 用戶登入
 * @param params
 * @param { type String } email 郵箱
 * @param { type String } password 密碼
 */
export const signInAPI = (params: ApiRequestSignIn) => {
  return useFetchData.post<ApiResponseSignIn>('/v1/auth/login', params)
}

/**
 * 用戶註冊
 * @param params
 * @param { type String } email 郵箱
 * @param { type String } password 密碼
 * @param { type String } firstName  姓氏(選填)
 * @param { type String } lastName 名字
 * @param { type String } mobilePhone 手機號碼 (選填)
 */
export const registerAPI = (params: ApiRequestRegister) => {
  return useFetchData.post<ApiResponseRegister>('/v1/auth/register-json', params)
}

/**
 * 取得用戶資訊
 */
export const getUserInfoAPI = () => {
  return useFetchData.get<User>('/v1/users/me')
}

/**
 * 發送重設密碼驗證信
 * @param params
 * @param { type String } email 郵箱
 */
export const resetPasswordAPI = (params: ApiRequestResetPassword) => {
  return useFetchData.post<null>('/v1/auth/reset-password', params)
}

/**
 * 發送重設密碼驗證信
 * @param params
 * @param { type String } token
 * @param { type String } newPassword 新密碼
 */
export const updatePasswordAPI = (params: ApiRequestUpdatePassword) => {
  return useFetchData.post<null>('/v1/auth/password', params)
}
