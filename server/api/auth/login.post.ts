export default defineEventHandler(async (event) => {
  // 讀取請求體
  const body = await readBody(event)
  const config = useRuntimeConfig()

  // 驗證請求參數
  if (!body.email || !body.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Email and password are required'
    })
  }

  try {
    // 轉發請求到外部 API
    console.log('本地 API - 轉發請求到外部 API', `${config.public.apiBase}/auth/login`)
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
      success: true,
      message: '登入成功',
      data: externalResponse
    }
  } catch (error: any) {
    console.error('External API Error:', error)
    console.log('Error Status Code:', error.statusCode)

    // 處理外部 API 的錯誤響應
    if (error.statusCode) {
      throw createError({
        statusCode: error.statusCode,
        statusMessage: error.statusMessage || 'External API Error',
        data: {
          message: error.data?.message || error.message || '外部 API 登入失敗'
        }
      })
    }

    // 處理網絡錯誤或其他錯誤
    throw createError({
      statusCode: 500,
      statusMessage: 'Internal Server Error',
      data: {
        message: '登入服務暫時無法使用，請稍後再試'
      }
    })
  }
})
