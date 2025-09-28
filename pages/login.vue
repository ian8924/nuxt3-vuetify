<script setup lang="ts">
const inputLoginParams = ref({
  email: 'ianliao0915+01@gmail.com',
  password: '1234563'
})

// 添加狀態變數來追蹤錯誤
const errorMessage = ref('')
const isLoading = ref(false)
const responseData = ref<any>(null)
const useLocalAPI = ref(false)

// 本地 API 登入（代理外部 API）
const handleLocalLogin = async () => {
  console.log('開始本地 API 登入請求（代理外部 API）...')
  isLoading.value = true
  errorMessage.value = ''
  responseData.value = null

  try {
    const data = await useFetchData.post('/auth/login', {
      email: inputLoginParams.value.email,
      password: inputLoginParams.value.password
    })

    responseData.value = data
    errorMessage.value = ''
  } catch (error: any) {
    responseData.value = error
    errorMessage.value = `登入失敗: ${error?.data?.message || error?.message || '本地 API 請求失敗，請檢查服務器狀態'}`
  } finally {
    isLoading.value = false
  }
}

function goToThemeDemo() {
  // 创建一个演示页面
  navigateTo('/theme-demo')
}

function goToFonts() {
  // 跳转到字体演示页面
  navigateTo('/fonts')
}

function goToAPITest() {
  // 跳转到 API 測試頁面
  navigateTo('/api-test')
}
</script>

<template>
  <v-app>
    <!-- 自定义背景 -->
    <div class="login-background">
      <div class="overlay">123</div>
      <v-container fill-height>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <!-- 登录卡片 -->
            <v-card class="custom-card elevation-12 fade-in-up">
              <v-card-title class="text-h4 text-center pa-6">
                <v-icon size="large" class="mr-2">mdi-account-circle</v-icon>
                用户登录
              </v-card-title>

              <v-card-text class="px-6 pb-6">
                <v-form>
                  <v-text-field
                    label="用户名"
                    prepend-inner-icon="mdi-account"
                    class="custom-input mb-4"
                    variant="outlined"
                  />

                  <v-text-field
                    label="密码"
                    type="password"
                    prepend-inner-icon="mdi-lock"
                    class="custom-input mb-4"
                    variant="outlined"
                  />

                  <v-switch
                    v-model="useLocalAPI"
                    label="使用本地 API"
                    class="mb-4"
                    color="primary"
                  />

                  <v-btn
                    v-if="!useLocalAPI"
                    class="custom-btn w-100 mb-2"
                    color="secondary"
                    size="large"
                    prepend-icon="mdi-server"
                    :loading="isLoading"
                    variant="outlined"
                    @click="handleLocalLogin()"
                  >
                    測試本地代理 API
                  </v-btn>

                  <!-- 錯誤訊息顯示 -->
                  <v-alert
                    v-if="errorMessage"
                    type="error"
                    class="mb-4"
                    variant="tonal"
                  >
                    {{ errorMessage }}
                  </v-alert>

                  <!-- API 響應數據顯示 -->
                  <v-card
                    v-if="responseData"
                    class="mb-4"
                    variant="outlined"
                  >
                    <v-card-title class="text-body-2">
                      API 響應數據:
                    </v-card-title>
                    <v-card-text>
                      <pre class="text-caption">{{ JSON.stringify(responseData, null, 2) }}</pre>
                    </v-card-text>
                  </v-card>

                  <v-row dense class="mb-4">
                    <v-col cols="6">
                      <v-btn
                        class="custom-btn w-100"
                        color="secondary"
                        variant="outlined"
                        prepend-icon="mdi-palette"
                        @click="goToThemeDemo"
                      >
                        主题演示
                      </v-btn>
                    </v-col>
                    <v-col cols="6">
                      <v-btn
                        class="custom-btn w-100"
                        color="accent"
                        variant="tonal"
                        prepend-icon="mdi-format-font"
                        @click="goToFonts"
                      >
                        字体演示
                      </v-btn>
                    </v-col>
                  </v-row>

                  <v-row dense class="mb-4">
                    <v-col cols="12">
                      <v-btn
                        class="custom-btn w-100"
                        color="info"
                        variant="outlined"
                        prepend-icon="mdi-api"
                        @click="goToAPITest"
                      >
                        API 測試頁面
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
.login-background {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  .overlay {
    background: red;
  }
}

// .v-theme--dark .login-background {
//   background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
// }
</style>
