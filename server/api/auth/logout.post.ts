export default defineEventHandler(async (event) => {
  try {
    // 清除 HTTP-only cookie
    setCookie(event, 'auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0), // 設置過期時間為過去，立即過期
      path: '/'
    })

    return {
      code: 200,
      success: true,
      message: '登出成功',
      data: null
    }
  } catch (error: any) {
    return {
      code: 500,
      success: false,
      message: '登出過程中發生錯誤',
      statusMessage: error.message || 'Internal Server Error'
    }
  }
})
