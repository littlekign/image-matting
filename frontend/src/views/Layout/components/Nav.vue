<template>
  <aside 
    class="sidebar z-20 flex flex-col h-screen select-none transition-all duration-300 ease-in-out border-r border-neutral-200/50 dark:border-zinc-800/40 bg-neutral-100/60 dark:bg-zinc-900/60 backdrop-blur-xl flex-shrink-0 sticky top-0"
    :class="isSidebarOpen ? 'w-60' : 'w-20'"
  >
    <!-- App Logo & Title Section -->
    <div class="flex items-center p-4 overflow-hidden border-b border-neutral-200/30 dark:border-zinc-800/20">
      <div 
        class="flex-shrink-0 flex items-center justify-center transition-all duration-300 ease-in-out"
        :class="isSidebarOpen ? 'w-9 h-9' : 'w-9 h-9 mx-auto'"
      >
        <img 
          src="/logo.png" 
          class="w-full h-full object-contain filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.06)] dark:drop-shadow-[0_2px_4px_rgba(255,255,255,0.04)] rounded-lg"
          alt="Logo"
        />
      </div>
      <div 
        class="ml-3 flex flex-col transition-all duration-300 ease-in-out"
        :class="isSidebarOpen ? 'opacity-100 max-w-[150px]' : 'opacity-0 max-w-0 overflow-hidden'"
      >
        <span class="text-sm font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 whitespace-nowrap">
          {{ t('meta.title') }}
        </span>
        <span class="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium whitespace-nowrap mt-0.5">
          Desktop AI Studio
        </span>
      </div>
    </div>

    <!-- Navigation Menu Items -->
    <div 
      class="flex-1 py-4 px-2 space-y-4 scrollbar-none transition-all duration-300"
      :class="isSidebarOpen ? 'overflow-y-auto overflow-x-hidden' : 'overflow-visible'"
    >
      <div v-for="group in menuGroups" :key="group.key" class="space-y-1">
        <!-- Section Header -->
        <div 
          v-if="isSidebarOpen && group.title" 
          class="px-3 py-1.5 text-[10px] font-semibold text-zinc-400/80 dark:text-zinc-500/80 tracking-wider uppercase select-none"
        >
          {{ group.title }}
        </div>
        
        <!-- Group Divider (when collapsed) -->
        <div 
          v-if="!isSidebarOpen && group.key !== 'creative'" 
          class="my-2 border-t border-neutral-200/30 dark:border-zinc-800/20 w-8 mx-auto"
        ></div>

        <!-- Links -->
        <router-link
          v-for="item in group.items"
          :key="item.to"
          :to="item.to"
          v-bind="!isSidebarOpen ? { 'data-tip': item.label } : {}"
          class="flex items-center rounded-lg transition-all duration-200 ease-in-out group relative"
          :class="[
            isActive(item.to) 
              ? 'bg-[#007aff] text-white shadow-sm shadow-[#007aff]/15 font-medium' 
              : 'text-zinc-700 dark:text-zinc-300 hover:bg-neutral-200/50 dark:hover:bg-zinc-800/30',
            isSidebarOpen ? 'px-3 py-2 gap-3 mx-2' : 'w-10 h-10 justify-center mx-auto',
            !isSidebarOpen ? 'tooltip tooltip-right' : ''
          ]"
        >
          <div 
            class="w-5 h-5 flex-shrink-0 flex items-center justify-center text-[16px] transition-transform duration-200 group-hover:scale-105"
            :class="isActive(item.to) ? 'text-white' : 'text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'"
          >
            <i :class="item.icon"></i>
          </div>
          
          <span 
            class="text-[13px] tracking-wide transition-all duration-300 whitespace-nowrap overflow-hidden"
            :class="isSidebarOpen ? 'opacity-100 max-w-[150px]' : 'opacity-0 max-w-0 pointer-events-none'"
          >
            {{ item.label }}
          </span>
        </router-link>
      </div>
    </div>

    <!-- Bottom Sidebar Toggle Action -->
    <div class="p-3 border-t border-neutral-200/30 dark:border-zinc-800/20 bg-neutral-100/30 dark:bg-zinc-900/30">
      <button 
        @click="toggleSidebar"
        v-bind="!isSidebarOpen ? { 'data-tip': isZh ? '展开侧边栏' : 'Expand Sidebar' } : {}"
        class="w-full flex items-center justify-center py-2 px-3 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-neutral-200/40 dark:hover:bg-zinc-800/40 transition-all duration-200"
        :class="!isSidebarOpen ? 'tooltip tooltip-right' : ''"
      >
        <i 
          class="fa-solid text-sm transition-transform duration-300 flex-shrink-0"
          :class="isSidebarOpen ? 'fa-chevron-left' : 'fa-chevron-right'"
        ></i>
        <span 
          class="text-xs font-medium ml-2 transition-all duration-300 whitespace-nowrap overflow-hidden"
          :class="isSidebarOpen ? 'opacity-100 max-w-[100px]' : 'opacity-0 max-w-0 pointer-events-none'"
        >
          Collapse
        </span>
      </button>
    </div>
  </aside>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

const { t, locale } = useI18n()
const route = useRoute()

// Check language locale
const isZh = computed(() => locale.value?.startsWith('zh'))

// Retrieve sidebar open state from localStorage, default to true
const isSidebarOpen = ref(localStorage.getItem('sidebar_open') !== 'false')

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
  localStorage.setItem('sidebar_open', isSidebarOpen.value.toString())
}

// Check if a navigation item's route is currently active, supporting sub-routes
const isActive = (path) => {
  const currentPath = route.path
  
  if (path === '/aimatting') {
    return ['/', '/aimatting', '/simple-img', '/multi-img'].includes(currentPath)
  }
  if (path === '/ai-photo') {
    return ['/ai-photo', '/image-editor', '/ai-photo-result'].includes(currentPath)
  }
  if (path === '/ai-inpainting') {
    return currentPath.startsWith('/ai-inpainting')
  }
  if (path === '/convert-home') {
    return ['/convert-home', '/convert-image-editor', '/multi-convert-image'].includes(currentPath)
  }
  if (path === '/compress-home') {
    return ['/compress-home', '/comporess-single', '/compress-multi'].includes(currentPath)
  }
  return currentPath === path
}

// Compute group titles dynamically based on translation/locale
const getGroupTitle = (groupKey) => {
  const titles = {
    creative: isZh.value ? '创意创作' : 'Creative Studio',
    utilities: isZh.value ? '实用工具' : 'Utilities',
    system: isZh.value ? '系统及关于' : 'System & Info'
  }
  return titles[groupKey] || ''
}

// Dynamic menu group layout matching macOS HIG categorization
const menuGroups = computed(() => [
  {
    key: 'creative',
    title: getGroupTitle('creative'),
    items: [
      { to: '/aimatting', icon: 'fa-solid fa-wand-magic-sparkles', label: t('menu.ai_matting_name') },
      { to: '/ai-inpainting', icon: 'fa-solid fa-eraser', label: t('menu.ai_inpainting_name') },
      { to: '/ai-photo', icon: 'fa-solid fa-id-card', label: t('menu.ai_photo_name') },
    ]
  },
  {
    key: 'utilities',
    title: getGroupTitle('utilities'),
    items: [
      { to: '/convert-home', icon: 'fa-solid fa-arrows-rotate', label: t('menu.convert_name') },
      { to: '/compress-home', icon: 'fa-solid fa-compress', label: t('menu.compress_name') },
    ]
  },
  {
    key: 'system',
    title: getGroupTitle('system'),
    items: [
      { to: '/setting', icon: 'fa-solid fa-gear', label: t('menu.setting') },
      { to: '/about', icon: 'fa-solid fa-circle-info', label: t('menu.about') },
    ]
  }
])
</script>

<style lang="scss" scoped>
/* Webkit backdrop filter for Safari / macOS Webview compatibility */
.sidebar {
  -webkit-backdrop-filter: blur(20px);
}

/* Custom scrollbar hiding standard styles while maintaining scrollability */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>

<style lang="scss">
/* Reset broad global dark.css styles specifically for the sidebar to fix visibility */
.dark {
  .sidebar {
    a {
      color: inherit !important;
      
      &:hover {
        color: inherit !important;
      }
    }
    
    div {
      background-color: transparent !important;
      color: inherit !important;
    }
  }
}
</style>