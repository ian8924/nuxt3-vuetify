<script setup lang="ts">
// 获取运行时配置
// const userStore = useUserStore()
const config = useRuntimeConfig()
const environment = config.public.environment
const nodeEnv = config.public.nodeEnv
const apiBase = config.public.apiBase
const baseUrl = config.public.baseUrl

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

function getEnvironmentColor(env: string) {
  switch (env) {
    case 'local':
      return 'info'
    case 'dev':
      return 'warning'
    case 'prod':
      return 'success'
    default:
      return 'primary'
  }
}

function getEnvironmentIcon(env: string) {
  switch (env) {
    case 'local':
      return '🔧'
    case 'dev':
      return '🧪'
    case 'prod':
      return '🚀'
    default:
      return '⚙️'
  }
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

    <!-- 环境信息卡片 -->
    <v-container class="mt-4">
      <v-card class="custom-card fade-in-up">
        <v-card-title class="d-flex align-center">
          <v-icon class="mr-2">mdi-information</v-icon>
          环境信息
        </v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-title>当前环境</v-list-item-title>
                <v-list-item-subtitle>
                  <v-chip
                    :color="getEnvironmentColor(environment)"
                    class="custom-chip"
                  >
                    {{ environment }} {{ getEnvironmentIcon(environment) }}
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item>
            </v-col>

            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-title>Node 环境</v-list-item-title>
                <v-list-item-subtitle>{{ nodeEnv }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>

            <v-col cols="12">
              <v-list-item>
                <v-list-item-title>API 基础地址</v-list-item-title>
                <v-list-item-subtitle>{{ apiBase }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>

            <v-col cols="12">
              <v-list-item>
                <v-list-item-title>网站基础 URL</v-list-item-title>
                <v-list-item-subtitle>{{ baseUrl }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>

          <v-divider class="my-4" />

          <v-alert type="info" variant="tonal" class="mb-0">
            <strong>环境说明:</strong><br />
            • Local: 本地开发环境 🔧<br />
            • Dev: 远程开发环境 🧪<br />
            • Prod: 生产环境 🚀
          </v-alert>
        </v-card-text>
      </v-card>
    </v-container>
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
