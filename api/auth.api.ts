import type { ApiRequestSignIn } from '@/types/interface/auth.interface'
/**
 * 用戶登入
 * @param params
 * @param { type String } email 郵箱
 * @param { type String } password 密碼
 */
export const signInAPI = (params: ApiRequestSignIn) => {
  return useFetchData.post('/auth/login', params)
}
