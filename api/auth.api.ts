import type { ApiRequestRegister, ApiRequestSignIn, ApiResponseRegister, ApiResponseSignIn } from '@/types/interface/auth.interface'
/**
 * 用戶登入
 * @param params
 * @param { type String } email 郵箱
 * @param { type String } password 密碼
 */
export const signInAPI = (params: ApiRequestSignIn) => {
  return useFetchData.post<ApiResponseSignIn>('/auth/login', params)
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
  return useFetchData.post<ApiResponseRegister>('/auth/register', params)
}
