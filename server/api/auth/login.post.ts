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
    const externalResponse = await $fetch(`${config.public.apiBase}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    console.log('External API Response:', externalResponse)

    // 返回外部 API 的響應，格式化為統一格式
    return {
      code: 200,
      success: true,
      message: '登入成功',
      data: externalResponse
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
