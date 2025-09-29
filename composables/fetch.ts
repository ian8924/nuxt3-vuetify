// import { callWithNuxt } from 'nuxt/app'
// import { useUserStore } from '~~/stores/user'
import type { NitroFetchOptions, NitroFetchRequest } from 'nitropack'

// export const ResponseStatusCode = {
//   // TOKEN 無法使用
//   tokenError: ['10002', '106101'],
//   NoPermission: 4,
//   C2COrderNotFound: 2029,
//   UserIsNotC2CMerchant: 2085,
//   Maintenance: '999999'
// } as const

//  types
enum AsyncApiMethod {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
  patch = 'PATCH'
}

export interface BaseApiResponse<TData = any> {
  scccess?: boolean
  data?: TData
  errorMessage?: string
  status?: number
}

// API 基礎設定
const fetchData = async <TData = unknown>(reqUrl: string, method: AsyncApiMethod, data?: any): Promise<BaseApiResponse<TData>> => {
  const runtimeConfig = useRuntimeConfig()

  const options: NitroFetchOptions<NitroFetchRequest, 'get' | 'patch' | 'post' | 'put' | 'delete'> = {
    baseURL: runtimeConfig.public.apiBase,
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }

  return new Promise((resolve) => {
    $fetch<BaseApiResponse<TData>>(reqUrl, {
      ...options,
      ...(method === AsyncApiMethod.get ? { params: data } : { body: data }),

      // 響應攔截器
      onResponse({ request, response }) {
        console.log('[fetch response]', request, response.status, response._data)
        resolve({
          scccess: response.status === 200,
          status: response.status,
          errorMessage: response._data?.message || 'Unknown error',
          data: response._data
        })
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
  get<TData = any>(url: string, params?: any) {
    return fetchData<TData>(url, AsyncApiMethod.get, params)
  }

  post<TData = any>(url: string, body?: any) {
    return fetchData<TData>(url, AsyncApiMethod.post, body)
  }

  put<TData = any>(url: string, body?: any) {
    return fetchData<TData>(url, AsyncApiMethod.put, body)
  }

  patch<TData = any>(url: string, body?: any) {
    return fetchData<TData>(url, AsyncApiMethod.patch, body)
  }

  delete<TData = any>(url: string, body?: any) {
    return fetchData<TData>(url, AsyncApiMethod.delete, body)
  }
})()
