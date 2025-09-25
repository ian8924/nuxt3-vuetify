<script setup lang="ts">
// 页面元数据
const aaa = ' 123'
console.log(aaa)
useHead({
  title: '字体系统演示 - Nuxt App',
  meta: [
    { name: 'description', content: '展示项目中的字体配置，包括中英文字体、等宽字体等各种排版效果' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- 页面标题 -->
      <div class="text-center mb-12">
        <h1
          class="text-4xl font-bold mb-4 text-gray-800 dark:text-white"
        >
          字体系统演示
        </h1>
        <p class="text-gray-600 dark:text-gray-300 text-lg">
          展示 Tailwind CSS 字体配置和中英文排版效果
        </p>
      </div>

      <!-- Sans Serif 字体 -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Sans Serif 字体</h2>
        <div class="space-y-6">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">默认 Sans Serif</h3>
            <div class="font-sans space-y-3">
              <p class="text-sm">Small Text (14px) - The quick brown fox jumps over the lazy dog</p>
              <p class="text-base">Base Text (16px) - The quick brown fox jumps over the lazy dog</p>
              <p class="text-lg">Large Text (18px) - The quick brown fox jumps over the lazy dog</p>
              <p class="text-xl">Extra Large (20px) - The quick brown fox jumps over the lazy dog</p>
              <p class="text-2xl">2XL (24px) - Quick Brown Fox</p>
              <p class="text-3xl">3XL (30px) - Quick Fox</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Chinese 字体 -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">中文字体</h2>
        <div class="space-y-6">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">中文字体效果</h3>
            <div class="font-chinese space-y-3">
              <p class="text-sm">小号文字 (14px) - 快速的棕色狐狸跳过懒惰的狗</p>
              <p class="text-base">基础文字 (16px) - 快速的棕色狐狸跳过懒惰的狗</p>
              <p class="text-lg">大号文字 (18px) - 快速的棕色狐狸跳过懒惰的狗</p>
              <p class="text-xl">超大文字 (20px) - 快速的棕色狐狸跳过懒惰的狗</p>
              <p class="text-2xl">特大文字 (24px) - 快速棕色狐狸</p>
              <p class="text-3xl">超大文字 (30px) - 快速狐狸</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Mono 字体 -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">等宽字体 (Monospace)</h2>
        <div class="space-y-6">
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">代码和数据展示</h3>
            <div class="font-mono space-y-4">
              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <p class="text-sm">const message = "Hello World";</p>
                <p class="text-sm">function greet(name) {</p>
                <p class="text-sm ml-4">return `Hello, ${name}!`;</p>
                <p class="text-sm">}</p>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-xs">Font Size: 12px</p>
                  <p class="text-sm">Font Size: 14px</p>
                  <p class="text-base">Font Size: 16px</p>
                </div>
                <div>
                  <p class="text-xs">字体大小: 12px</p>
                  <p class="text-sm">字体大小: 14px</p>
                  <p class="text-base">字体大小: 16px</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 字重演示 -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">字体重量 (Font Weight)</h2>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">英文字重</h3>
              <div class="space-y-2">
                <p class="font-thin">Thin (100) - The quick brown fox</p>
                <p class="font-extralight">Extra Light (200) - The quick brown fox</p>
                <p class="font-light">Light (300) - The quick brown fox</p>
                <p class="font-normal">Normal (400) - The quick brown fox</p>
                <p class="font-medium">Medium (500) - The quick brown fox</p>
                <p class="font-semibold">Semibold (600) - The quick brown fox</p>
                <p class="font-bold">Bold (700) - The quick brown fox</p>
                <p class="font-extrabold">Extra Bold (800) - The quick brown fox</p>
                <p class="font-black">Black (900) - The quick brown fox</p>
              </div>
            </div>
            <div>
              <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">中文字重</h3>
              <div class="space-y-2 font-chinese">
                <p class="font-thin">细体 (100) - 快速的棕色狐狸</p>
                <p class="font-extralight">超细 (200) - 快速的棕色狐狸</p>
                <p class="font-light">细 (300) - 快速的棕色狐狸</p>
                <p class="font-normal">常规 (400) - 快速的棕色狐狸</p>
                <p class="font-medium">中等 (500) - 快速的棕色狐狸</p>
                <p class="font-semibold">半粗 (600) - 快速的棕色狐狸</p>
                <p class="font-bold">粗体 (700) - 快速的棕色狐狸</p>
                <p class="font-extrabold">超粗 (800) - 快速的棕色狐狸</p>
                <p class="font-black">特粗 (900) - 快速的棕色狐狸</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 文本样式演示 -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">文本样式</h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- 标题样式 -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">标题层级</h3>
            <div class="space-y-3">
              <h1 class="text-3xl font-bold">H1 标题</h1>
              <h2 class="text-2xl font-bold">H2 标题</h2>
              <h3 class="text-xl font-bold">H3 标题</h3>
              <h4 class="text-lg font-semibold">H4 标题</h4>
              <h5 class="text-base font-semibold">H5 标题</h5>
              <h6 class="text-sm font-semibold">H6 标题</h6>
            </div>
          </div>

          <!-- 文本装饰 -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">文本装饰</h3>
            <div class="space-y-3">
              <p class="underline">下划线文字</p>
              <p class="line-through">删除线文字</p>
              <p class="italic">斜体文字</p>
              <p class="uppercase">大写文字</p>
              <p class="lowercase">LOWERCASE文字</p>
              <p class="capitalize">首字母大写</p>
            </div>
          </div>

          <!-- 文本对齐 -->
          <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">文本对齐</h3>
            <div class="space-y-3">
              <p class="text-left">左对齐文字</p>
              <p class="text-center">居中对齐文字</p>
              <p class="text-right">右对齐文字</p>
              <p class="text-justify">两端对齐的长文字内容，展示文字在容器中的对齐效果。</p>
            </div>
          </div>
        </div>
      </div>

      <!-- 字体使用代码示例 -->
      <div class="mb-12">
        <h2 class="text-2xl font-bold mb-6 text-gray-800 dark:text-white">使用代码示例</h2>
        <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">HTML 类名</h3>
              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm space-y-2">
                <p>font-sans - 无衬线字体</p>
                <p>font-chinese - 中文字体</p>
                <p>font-mono - 等宽字体</p>
                <p>font-serif - 衬线字体</p>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Vue 组件示例</h3>
              <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg font-mono text-sm space-y-2">
                <p>&lt;p class="font-chinese text-lg"&gt;</p>
                <p>&nbsp;&nbsp;中文内容</p>
                <p>&lt;/p&gt;</p>
                <p>&lt;code class="font-mono"&gt;</p>
                <p>&nbsp;&nbsp;代码内容</p>
                <p>&lt;/code&gt;</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 返回按钮 -->
      <div class="text-center">
        <button
          class="bg-primary hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-flex items-center gap-2"
          @click="$router.back()"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          返回
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 确保字体正确显示 */
.font-chinese {
  font-family: 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', 'WenQuanYi Micro Hei', sans-serif;
}
</style>
