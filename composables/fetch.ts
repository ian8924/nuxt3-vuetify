// import { callWithNuxt } from 'nuxt/app'
// import { useUserStore } from '~~/stores/user'
import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack'

export const ResponseStatusCode = {
  // TOKEN 無法使用
  tokenError: ['10002', '106101'],
  NoPermission: 4,
  C2COrderNotFound: 2029,
  UserIsNotC2CMerchant: 2085,
  Maintenance: '999999'
} as const

//  types
enum AsyncApiMethod {
  get = 'GET',
  post = 'POST',
  put = 'PUT',
  delete = 'DELETE',
  patch = 'PATCH'
}

export interface BaseApiResponse<TData = any> {
  code: string | number
  msg: string
  data: TData | null
  message: string | null
}

// export const handleTokenError = (msg: string) => {
//   const { $toast } = useNuxtApp()
//   const runtimeConfig = useRuntimeConfig()
//   const token = useCookie('token', {
//     path: '/'
//   })
//   const tokenFromDomain = useCookie('token', {
//     domain: runtimeConfig.public.DOMAIN_NAME,
//     path: '/'
//   })

//   token.value = null
//   tokenFromDomain.value = null
//   if (process.client) {
//     $toast.error(msg, { toastId: 'tokenError' })
//     setTimeout(() => {
//       const localePath = useLocalePath()
//       const router = useRouter()
//       const { CLEAR_TIME_INTERVAL } = useUserStore()
//       CLEAR_TIME_INTERVAL()
//       router.push(localePath('/login'))
//     }, 1500)
//   }
// }

// API 基礎設定
const fetchData = async <TData = unknown>(
  reqUrl: string,
  method: AsyncApiMethod,
  data?: any
) => {
  const runtimeConfig = useRuntimeConfig()
  console.log('Runtime Config:', runtimeConfig.public)
  const options :NitroFetchOptions<NitroFetchRequest, 'get' | 'patch' | 'post' | 'put' | 'delete' > = {
    baseURL: runtimeConfig.public.apiBase,
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  try {
    const res = await $fetch<BaseApiResponse<TData>>(reqUrl, {
      ...options,
      ...(method === AsyncApiMethod.get ? { params: data } : { body: data })
    })

    // const { msg, code, data: resData } = res

    // if (ResponseStatusCode.tokenError.includes(code as any)) {
    //   callWithNuxt(nuxtApp, handleTokenError, [msg])
    // }

    return res
  } catch (error) {
    console.log('Fetch Error:', error)
    // showServerError()
    // callWithNuxt(nuxtApp, showServerError)
    throw error
  }
}

export const useFetchData = new (class getData {
  get<TData = any> (url: string, params?: any) {
    return fetchData<TData>(url, AsyncApiMethod.get, params)
  }

  post<TData = any> (url: string, body?: any) {
    return fetchData<TData>(url, AsyncApiMethod.post, body)
  }

  put<TData = any> (url: string, body?: any) {
    return fetchData<TData>(url, AsyncApiMethod.put, body)
  }

  patch<TData = any> (url: string, body?: any) {
    return fetchData<TData>(url, AsyncApiMethod.patch, body)
  }

  delete<TData = any> (url: string, body?: any) {
    return fetchData<TData>(url, AsyncApiMethod.delete, body)
  }
})()
