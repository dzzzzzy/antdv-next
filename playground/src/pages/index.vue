<script setup lang="ts">
import LogoIcon from '@/components/icons/logo.vue'

const features = [
  {
    title: '极致性能',
    desc: '深度适配 Vue 3.5+ 响应式系统，极速首屏加载与极低内存占用。',
    icon: 'ri-flashlight-fill',
    colorClass: 'text-primary bg-primary/10',
  },
  {
    title: '类型安全',
    desc: '全量 TypeScript 定义，提供 100% 覆盖率的 Props 与事件提示。',
    icon: 'ri-shield-check-fill',
    colorClass: 'text-blue-500 bg-blue-500/10',
  },
  {
    title: '设计自由',
    desc: '深度集成 Tailwind CSS 色彩体系，支持一键动态切换主题变量。',
    icon: 'ri-palette-fill',
    colorClass: 'text-indigo-500 bg-indigo-500/10',
  },
]
</script>

<template>
  <main class="min-h-screen bg-white dark:bg-[#020617] transition-colors duration-500 overflow-hidden mt--55px">
    <div class="absolute inset-0 z-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

    <section class="relative z-10 px-6 pt-24 pb-24 lg:pt-36 lg:pb-40">
      <div class="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-blue-400 opacity-20 dark:opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] animate-pulse" />
      </div>

      <div class="mx-auto max-w-7xl text-center">
        <div class="mb-10 flex justify-center">
          <div class="relative group">
            <div class="absolute -inset-1.5 rounded-full bg-gradient-to-r from-primary to-blue-400 opacity-15 blur-md group-hover:opacity-30 transition duration-1000 group-hover:duration-500" />
            <LogoIcon class="text-[100px]" />
          </div>
        </div>

        <h1 class="text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-8xl">
          Antdv <span class="bg-gradient-to-br from-primary via-primary to-blue-500 bg-clip-text text-transparent italic">Next</span>
        </h1>

        <p class="mt-8 text-xl leading-relaxed text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
          基于 Vue 3 实现的企业级组件库
          <span class="block mt-2 text-slate-400 dark:text-slate-500 font-normal italic tracking-wide">
            设计规范采用Ant Design V6.0规范，支持暗黑模式与多主题切换
          </span>
        </p>

        <div class="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <a-button type="primary" size="large" class="hero-btn-next !h-14 !px-10 !text-lg !rounded-2xl border-none shadow-lg shadow-primary/20">
            快速上手
          </a-button>
          <a-button size="large" class="h-14! px-10! text-lg! rounded-2xl! border-slate-200 dark:border-slate-700 bg-transparent hover:!bg-slate-50 dark:hover:!bg-slate-800/50 transition-all">
            仓库地址
          </a-button>
        </div>
      </div>
    </section>

    <section class="relative z-10 py-24 px-6">
      <div class="mx-auto max-w-7xl">
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="(item, index) in features" :key="index" class="feature-card-new group">
            <div :class="`icon-box ${item.colorClass}`">
              <i :class="`${item.icon} text-2xl`" />
            </div>
            <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <footer class="relative z-10 py-12 px-6 border-t border-slate-100 dark:border-slate-800/50">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-sm text-slate-400">
        <div class="flex gap-8">
          <a href="#" class="hover:text-primary transition-colors">Documentation</a>
          <a href="#" class="hover:text-primary transition-colors">Components</a>
          <a href="#" class="hover:text-primary transition-colors">GitHub</a>
        </div>
        <p>© 2025 Antdv-Next. Built for Performance.</p>
      </div>
    </footer>
  </main>
</template>

<style scoped>
/* 主按钮重新打磨：更清亮 */
.hero-btn-next {
  background-color: theme('colors.primary') !important;
  color: white !important;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
}

.hero-btn-next:hover {
  transform: translateY(-3px);
  background-color: theme('colors.primary') !important;
  box-shadow: 0 20px 30px -10px rgba(var(--primary-rgb, 245, 29, 44), 0.4) !important;
  filter: brightness(1.1);
}

/* 特性卡片重塑：更扁平现代 */
.feature-card-new {
  @apply p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800/60
  bg-white dark:bg-slate-900/40 transition-all duration-300
  hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5;
}

.icon-box {
  @apply mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl
  transition-all duration-500 group-hover:-rotate-6 group-hover:scale-110;
}

/* 暗黑模式按钮兼容 */
:deep(.ant-btn) {
  @apply font-medium transition-all;
}
</style>
