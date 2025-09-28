<script setup lang="ts">
const apiResults = ref<Record<string, any>>({})
const isLoading = ref<Record<string, boolean>>({})

// 測試 API 狀態
const testAPIStatus = async () => {
  const key = 'status'
  isLoading.value[key] = true

  try {
    const response = await fetch('/api')
    const data = await response.json()

    apiResults.value[key] = {
      status: response.status,
      data,
      timestamp: new Date().toISOString()
    }
  } catch (error: any) {
    apiResults.value[key] = {
      error: error.message,
      timestamp: new Date().toISOString()
    }
  } finally {
    isLoading.value[key] = false
  }
}

// 測試登入 API (代理外部 API)
const testLoginAPI = async () => {
  const key = 'login'
  isLoading.value[key] = true

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'ianliao0915+01@gmail.com',
        password: '1234563'
      })
    })

    const data = await response.json()

    apiResults.value[key] = {
      status: response.status,
      data,
      timestamp: new Date().toISOString()
    }
  } catch (error: any) {
    apiResults.value[key] = {
      error: error.message,
      timestamp: new Date().toISOString()
    }
  } finally {
    isLoading.value[key] = false
  }
}

// 測試模擬登入 API
const testMockLoginAPI = async () => {
  const key = 'mockLogin'
  isLoading.value[key] = true

  try {
    const response = await fetch('/api/auth/mock-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'password123'
      })
    })

    const data = await response.json()

    apiResults.value[key] = {
      status: response.status,
      data,
      timestamp: new Date().toISOString()
    }
  } catch (error: any) {
    apiResults.value[key] = {
      error: error.message,
      timestamp: new Date().toISOString()
    }
  } finally {
    isLoading.value[key] = false
  }
}

// 測試註冊 API
const testRegisterAPI = async () => {
  const key = 'register'
  isLoading.value[key] = true

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'newuser@example.com',
        password: 'password123',
        name: '測試新用戶'
      })
    })

    const data = await response.json()

    apiResults.value[key] = {
      status: response.status,
      data,
      timestamp: new Date().toISOString()
    }
  } catch (error: any) {
    apiResults.value[key] = {
      error: error.message,
      timestamp: new Date().toISOString()
    }
  } finally {
    isLoading.value[key] = false
  }
}

// 測試用戶 API
const testUserAPI = async () => {
  const key = 'user'
  isLoading.value[key] = true

  try {
    const response = await fetch('/api/user', {
      headers: {
        Authorization: 'Bearer mock-token-123'
      }
    })

    const data = await response.json()

    apiResults.value[key] = {
      status: response.status,
      data,
      timestamp: new Date().toISOString()
    }
  } catch (error: any) {
    apiResults.value[key] = {
      error: error.message,
      timestamp: new Date().toISOString()
    }
  } finally {
    isLoading.value[key] = false
  }
}

// 清除結果
const clearResults = () => {
  apiResults.value = {}
}

// 頁面標題
useHead({
  title: 'API 測試頁面'
})
</script>

<template>
  <v-app>
    <v-container class="pa-6">
      <v-row>
        <v-col cols="12">
          <h1 class="text-h4 mb-6">🧪 API 測試頁面</h1>

          <!-- 操作按鈕 -->
          <v-card class="mb-6">
            <v-card-title>測試操作</v-card-title>
            <v-card-text>
              <v-row dense>
                <v-col cols="12" md="2">
                  <v-btn
                    color="primary"
                    prepend-icon="mdi-server-network"
                    :loading="isLoading.status"
                    block
                    @click="testAPIStatus"
                  >
                    API 狀態
                  </v-btn>
                </v-col>

                <v-col cols="12" md="2">
                  <v-btn
                    color="success"
                    prepend-icon="mdi-login"
                    :loading="isLoading.login"
                    block
                    @click="testLoginAPI"
                  >
                    代理登入
                  </v-btn>
                </v-col>

                <v-col cols="12" md="2">
                  <v-btn
                    color="orange"
                    prepend-icon="mdi-test-tube"
                    :loading="isLoading.mockLogin"
                    block
                    @click="testMockLoginAPI"
                  >
                    模擬登入
                  </v-btn>
                </v-col>

                <v-col cols="12" md="2">
                  <v-btn
                    color="info"
                    prepend-icon="mdi-account-plus"
                    :loading="isLoading.register"
                    block
                    @click="testRegisterAPI"
                  >
                    註冊 API
                  </v-btn>
                </v-col>

                <v-col cols="12" md="2">
                  <v-btn
                    color="warning"
                    prepend-icon="mdi-account"
                    :loading="isLoading.user"
                    block
                    @click="testUserAPI"
                  >
                    用戶 API
                  </v-btn>
                </v-col>

                <v-col cols="12" md="2">
                  <v-btn
                    color="error"
                    prepend-icon="mdi-delete"
                    variant="outlined"
                    block
                    @click="clearResults"
                  >
                    清除結果
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>

          <!-- API 結果顯示 -->
          <div v-for="(result, key) in apiResults" :key="key" class="mb-4">
            <v-card>
              <v-card-title class="d-flex align-center">
                <v-icon class="mr-2">
                  {{ key === 'status' ? 'mdi-server-network'
                    : key === 'login' ? 'mdi-login'
                      : key === 'mockLogin' ? 'mdi-test-tube'
                        : key === 'register' ? 'mdi-account-plus'
                          : 'mdi-account' }}
                </v-icon>
                {{ key === 'status' ? 'API 狀態'
                  : key === 'login' ? '代理登入 API'
                    : key === 'mockLogin' ? '模擬登入 API'
                      : key === 'register' ? '註冊 API'
                        : '用戶 API' }} 測試結果
                <v-spacer />
                <v-chip
                  :color="result.status >= 200 && result.status < 300 ? 'success' : 'error'"
                  size="small"
                >
                  {{ result.status || 'ERROR' }}
                </v-chip>
              </v-card-title>

              <v-card-text>
                <div class="mb-2">
                  <strong>時間戳:</strong> {{ result.timestamp }}
                </div>

                <v-divider class="mb-4" />

                <div v-if="result.error" class="error-message">
                  <strong>錯誤:</strong>
                  <pre class="text-caption mt-2">{{ result.error }}</pre>
                </div>

                <div v-else class="response-data">
                  <strong>響應數據:</strong>
                  <pre class="text-caption mt-2">{{ JSON.stringify(result.data, null, 2) }}</pre>
                </div>
              </v-card-text>
            </v-card>
          </div>

          <!-- 返回按鈕 -->
          <v-btn
            color="primary"
            prepend-icon="mdi-arrow-left"
            class="mt-6"
            @click="$router.back()"
          >
            返回
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<style scoped>
pre {
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
}

.error-message pre {
  background-color: #ffebee;
  color: #c62828;
}
</style>
