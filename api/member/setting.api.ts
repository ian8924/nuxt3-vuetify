import type { User } from '@/types/interface/auth.interface'

/**
 * 更新用戶資訊
 * @param form Object
 */

export const putMemberInfoAPI = (form: any) => {
  return useFetchData.put<User>('/v1/users/me', form)
}

/**
 * 更新用戶頭像
 * @param form FormData
 */
export const postMemberAvatarAPI = (form: { avatar: File }) => {
  return useFetchData.post<User>('/v1/users/me/avatar', form, 'user', true)
}

/**
  獲取發票設置
 */
export const getInvoiceSettingsAPI = () => {
  return useFetchData.get(`/v1/invoice-settings`)
}

/**
   新增發票設置
 */
export const postInvoiceSettingsAPI = (form: any) => {
  return useFetchData.post(`/v1/invoice-settings`, form)
}
