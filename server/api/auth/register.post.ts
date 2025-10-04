export default defineEventHandler(async (event) => {
  // 讀取請求體
  const body = await readBody(event)
  const config = useRuntimeConfig()
  // console.log('External API Response:1111', body)

  try {
    // 轉發請求到外部 API
    const externalResponse = await $fetch(`${config.public.apiBase}/auth/register?email=${body.email}&password=${body.password}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    // 返回外部 API 的響應，格式化為統一格式
    return {
      code: 200,
      success: true,
      message: '註冊成功',
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

    if (error.statusCode === 409) {
      return {
        code: 409,
        success: false,
        message: '電子郵件已被註冊',
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
