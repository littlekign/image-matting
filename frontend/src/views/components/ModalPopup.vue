<template>
  <div v-if="visible" class="fixed left-0 top-0 w-screen h-screen p-4 inset-0 flex items-center justify-center z-50" >
    <!-- 暗色遮罩 -->
    <div class="fixed left-0 top-0 inset-0 bg-black opacity-50 w-screen h-screen" @click="close"></div>
    <!-- 弹窗内容 -->
    <div class="relative bg-white dark:bg-zinc-900 border dark:border-zinc-800 rounded-lg shadow-lg p-6 z-10 min-w-[320px] max-w-[95vw] md:max-w-[90vw] max-h-[90vh] flex flex-col">
      <!-- 右上角关闭图标 -->
      <button @click="close" class="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-zinc-400 dark:hover:text-zinc-200">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 class="text-xl font-semibold mb-4 text-zinc-900 dark:text-zinc-100 flex-shrink-0">{{ title }}</h2>
      <div class="flex flex-col items-center justify-center w-full flex-grow overflow-y-auto my-2 min-h-0">
        <slot></slot>
      </div>
      <div class="flex justify-end w-full mt-4 gap-3 flex-shrink-0">
        <!-- 如果 showCancelButton 为 true，则展示取消按钮 -->
        <button v-if="showCancelButton" @click="close" class="bg-gray-300 dark:bg-zinc-700 hover:bg-gray-400 dark:hover:bg-zinc-600 text-white px-4 py-2 rounded-full text-sm">
          {{ t('common.btn_cancel') }}
        </button>
        <!-- 如果 showConfirmButton 为 true，则展示确认按钮 -->
        <button v-if="showConfirmButton" @click="confirm" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm">
          {{ t('common.btn_confirm') }}
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const props = defineProps({
  title: {
    type: String,
    default: '标题',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  showCancelButton: {
    type: Boolean,
    default: true, // 默认显示取消按钮
  },
  showConfirmButton: {
    type: Boolean,
    default: true, // 默认显示确认按钮
  },
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const visible = ref(props.modelValue)

watch(() => props.modelValue, (newValue) => {
  visible.value = newValue
})

const close = () => {
  emit('update:modelValue', false)
}

const confirm = () => {
  emit('confirm')
  close()
}
</script>

<style scoped>
/* 在这里添加任何额外的样式 */
</style>