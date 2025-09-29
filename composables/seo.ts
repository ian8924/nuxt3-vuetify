// SEO 和 OpenGraph 的 composable
export interface SEOData {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: 'website' | 'article' | 'profile'
  keywords?: string
  author?: string
}

export const useSEO = (seoData: SEOData = {}) => {
  const { $router } = useNuxtApp()
  const config = useRuntimeConfig()

  // 默認值
  const defaultSEO = {
    title: '樂見影像 - 專業影像服務平台',
    description: '提供專業的影像處理、攝影服務與視覺解決方案',
    image: '/fav.png',
    type: 'website' as const,
    keywords: '樂見影像,影像處理,攝影服務,視覺設計,專業攝影',
    author: '樂見影像'
  }

  // 合併數據
  const finalSEO = { ...defaultSEO, ...seoData }

  // 獲取當前完整 URL
  const currentURL = process.client
    ? window.location.href
    : `${config.public.baseURL}${$router.currentRoute.value.fullPath}`

  // 設置 head 標籤
  useHead({
    title: finalSEO.title,
    meta: [
      { name: 'description', content: finalSEO.description },
      { name: 'keywords', content: finalSEO.keywords },
      { name: 'author', content: finalSEO.author },

      // OpenGraph
      { property: 'og:title', content: finalSEO.title },
      { property: 'og:description', content: finalSEO.description },
      { property: 'og:image', content: finalSEO.image },
      { property: 'og:url', content: finalSEO.url || currentURL },
      { property: 'og:type', content: finalSEO.type },

      // Twitter
      { name: 'twitter:title', content: finalSEO.title },
      { name: 'twitter:description', content: finalSEO.description },
      { name: 'twitter:image', content: finalSEO.image }
    ]
  })

  return {
    seo: finalSEO,
    setSEO: (newSEO: Partial<SEOData>) => {
      Object.assign(finalSEO, newSEO)
    }
  }
}

// 頁面專用的 SEO 預設
export const pageSEO = {
  // 首頁
  home: {
    title: '樂見影像 - 專業影像服務平台',
    description: '專業的影像處理、攝影服務與視覺解決方案提供商',
    keywords: '樂見影像,首頁,影像服務,攝影,視覺設計'
  },

  // 登入頁
  login: {
    title: '會員登入 - 樂見影像',
    description: '登入樂見影像會員中心，享受專業影像服務',
    keywords: '登入,會員,樂見影像'
  },

  // 註冊頁
  register: {
    title: '會員註冊 - 樂見影像',
    description: '註冊成為樂見影像會員，享受專業影像服務',
    keywords: '註冊,會員,樂見影像'
  },

  // 儀表板
  dashboard: {
    title: '會員中心 - 樂見影像',
    description: '樂見影像會員專屬服務中心',
    keywords: '會員中心,儀表板,樂見影像'
  }
}
