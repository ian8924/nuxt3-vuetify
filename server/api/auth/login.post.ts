// 定義外部 API 響應的類型
interface ExternalAuthResponse {
  token: string
  tokenType: string
  expiresIn: number
  user?: any
  [key: string]: any
}

export default defineEventHandler(async (event) => {
  // 讀取請求體
  const body = await readBody(event)
  const config = useRuntimeConfig()

  // 驗證請求參數
  if (!body.email || !body.password) {
    return {
      code: 400,
      success: false,
      message: '請提供電子郵件和密碼',
      statusMessage: '請提供電子郵件和密碼'
    }
  }

  try {
    // 轉發請求到外部 API
    const externalResponse = await $fetch<ExternalAuthResponse>(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    console.log('External API Response:', externalResponse)

    // 如果外部 API 返回了 token，設置為 HTTP cookie
    if (externalResponse.token) {
      // 計算 cookie 過期時間（以秒為單位轉換為毫秒）
      const expiresIn = externalResponse.expiresIn || 3600 // 默認1小時
      const cookieExpires = new Date(Date.now() + expiresIn * 1000)

      // 設置 HTTP-only cookie
      setCookie(event, 'auth-token', externalResponse.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // 生產環境使用 HTTPS
        sameSite: 'lax',
        expires: cookieExpires,
        path: '/'
      })
    }

    // 返回外部 API 的響應，格式化為統一格式
    return {
      code: 200,
      success: true,
      message: '登入成功',
      data: {
        ...externalResponse
        // 為了安全起見，可以選擇不在響應中返回 token（因為已經設置為 cookie）
        // token: undefined // 取消註釋這行如果不想在響應中返回 token
      }
    }
  } catch (error: any) {
    // 處理外部 API 的錯誤響應
    if (error.statusCode === 400 || error.statusCode === 401) {
      return {
        code: error.statusCode,
        success: false,
        message: '電子郵件或密碼錯誤，請重新輸入',
        statusMessage: error.statusMessage
      }
    }

    return {
      code: 500,
      success: false,
      message: 'Internal Server Error',
      statusMessage: 'Internal Server Error'
    }
  }
})
