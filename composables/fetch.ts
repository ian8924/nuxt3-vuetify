import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

//  types
enum AsyncApiMethod {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
  patch = 'PATCH'
}

export interface BaseApiResponse<TData = any> {
  success?: boolean
  data?: TData
  errorMessage?: string
  status?: number
}

// API 基礎設定
const fetchData = async <TData = unknown>(
  reqUrl: string,
  method: AsyncApiMethod,
  data?: any,
  apiService?: 'user' | 'album' | 'activity',
  isUpload = false,
  returnError = false,
  checkErrorStatus = true
): Promise<BaseApiResponse<TData>> => {
  const runtimeConfig = useRuntimeConfig()
  const notifyStore = useNotifyStore()
  const router = useRouter()
  const token = useCookie('token').value || ''

  let baseURL = ''
  if (apiService === 'user') {
    baseURL = runtimeConfig.public.apiBase
  } else if (apiService === 'album') {
    baseURL = runtimeConfig.public.apiAlbum
  } else if (apiService === 'activity') {
    baseURL = runtimeConfig.public.apiActivity
  }

  let formData = null
  console.log('data', data)

  if (isUpload) {
    formData = new FormData()
    // 如果 data 已經是 FormData，直接使用它
    for (const [key, value] of Object.entries(data)) {
      if (value instanceof Blob || value instanceof File) {
        formData.append(key, value)
      } else {
        formData.append(key, String(value))
      }
    }
  }

  const options: NitroFetchOptions<NitroFetchRequest, 'get' | 'patch' | 'post' | 'put' | 'delete'> = {
    baseURL,
    method,
    headers: {
      ...(isUpload ? {} : { 'Content-Type': 'application/json' }), // 上傳時不設定 Content-Type，讓瀏覽器自動設定
      Authorization: token ? `Bearer ${token}` : '' // 假設 token 存儲在 cookie 中
    }
  }

  return new Promise((resolve, reject) => {
    $fetch<BaseApiResponse<TData>>(reqUrl, {
      ...options,
      ...(method === AsyncApiMethod.get ? { params: data } : { body: isUpload ? formData : data }),

      // 響應攔截器
      onResponse({ request, response }) {
        console.log('[fetch response]', request, response.status)

        if (response.status === 403 && checkErrorStatus) {
          notifyStore.SHOW_NOTIFY({ message: '請重新登入', type: 'error' })
          router.push('/auth/login')
        }
        if (response.status === 200 || response.status === 204 || response.status === 201) {
          resolve({
            success: response.status === 200 || response.status === 204 || response.status === 201,
            status: response.status,
            errorMessage: response._data?.message || 'Unknown error',
            data: response._data
          })
        } else {
          returnError
            ? reject(new Error(response._data?.message || 'Unknown error'))
            : resolve({
                success: response.status === 200 || response.status === 204 || response.status === 201,
                status: response.status,
                errorMessage: response._data?.message || 'Unknown error',
                data: response._data
              })
        }
      }

      //   // console.error('[fetch response error]', {
      //   //   url: request,
      //   //   status: response.status,
      //   //   statusText: response.statusText,
      //   //   data: response._data
      //   // })

      //   // // 處理特定的錯誤狀態
      //   // if (response.status === 401) {
      //   //   console.log('未授權，可能需要重新登入')
      //   //   // 可以在這裡處理登出邏輯
      //   // }

      //   // if (response.status === 403) {
      //   //   console.log('權限不足')
      //   // }

      //   // if (response.status >= 500) {
      //   //   console.log('服務器錯誤')
      //   // }
      // }
    })
  })
}

export const useFetchData = new (class getData {
  get<TData = any>(url: string, params?: any, apiService: 'user' | 'album' | 'activity' = 'user', isUpload: boolean = false, returnError: boolean = false, checkErrorStatus: boolean = true) {
    return fetchData<TData>(url, AsyncApiMethod.get, params, apiService, isUpload, returnError, checkErrorStatus)
  }

  post<TData = any>(url: string, body?: any, apiService: 'user' | 'album' | 'activity' = 'user', isUpload: boolean = false, returnError: boolean = false, checkErrorStatus: boolean = true) {
    return fetchData<TData>(url, AsyncApiMethod.post, body, apiService, isUpload, returnError, checkErrorStatus)
  }

  put<TData = any>(url: string, body?: any, apiService: 'user' | 'album' | 'activity' = 'user', isUpload: boolean = false, returnError: boolean = false, checkErrorStatus: boolean = true) {
    return fetchData<TData>(url, AsyncApiMethod.put, body, apiService, isUpload, returnError, checkErrorStatus)
  }

  patch<TData = any>(url: string, body?: any, apiService: 'user' | 'album' | 'activity' = 'user', isUpload: boolean = false, returnError: boolean = false, checkErrorStatus: boolean = true) {
    return fetchData<TData>(url, AsyncApiMethod.patch, body, apiService, isUpload, returnError, checkErrorStatus)
  }

  delete<TData = any>(url: string, body?: any, apiService: 'user' | 'album' | 'activity' = 'user', isUpload: boolean = false, returnError: boolean = false, checkErrorStatus: boolean = true) {
    return fetchData<TData>(url, AsyncApiMethod.delete, body, apiService, isUpload, returnError, checkErrorStatus)
  }
})()
