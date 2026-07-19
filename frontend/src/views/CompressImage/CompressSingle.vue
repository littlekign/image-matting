<template>
    <div class="container mx-auto p-4 md:p-6">
        <div class="grid grid-cols-3 gap-4 items-stretch">
            <!-- 左侧原始图片信息 -->
            <div class="border border-neutral-200 dark:border-zinc-800 p-4 rounded-lg shadow-sm bg-white dark:bg-zinc-900/50 flex flex-col justify-between min-h-[300px]">
                <div>
                    <h2 class="text-lg font-bold mb-3">{{ t('compress.compress_single.original_title') }}</h2>
                    <div v-if="originalImage" class="flex flex-col items-center">
                        <img :src="originalInfo.img" alt="" class="w-24 h-24 object-cover mb-3 rounded shadow-sm">
                        <ul class="break-all w-full text-xs md:text-sm space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li><strong>{{ t('compress.compress_single.size') }}:</strong> {{ originalInfo.size }}</li>
                            <li><strong>{{ t('compress.compress_single.format') }}:</strong> {{ originalInfo.format }}</li>
                            <li><strong>{{ t('compress.compress_single.color_mode') }}:</strong> {{ originalInfo.colorMode }}</li>
                            <li><strong>{{  t('compress.compress_single.file_size') }}:</strong> {{ originalInfo.formatSize }}</li>
                            <li class="cursor-pointer text-blue-500 hover:underline" @click="openFile(originalInfo.path)"><strong>{{ t('compress.compress_single.path') }}:</strong> {{ originalInfo.path }}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- 中间的按钮区域 -->
            <div class="flex flex-col justify-center items-center space-y-4">
                <button @click="handleSelectFile"
                    class="bg-blue-500 btn border-none text-white px-6 py-2 rounded-full btn-md hover:bg-blue-600 shadow-md">
                    {{ t('compress.compress_single.select_btn') }}
                </button>
                <button @click="handleCompressImage" :disabled="!originalImage"
                    class="bg-green-500 btn border-none text-white px-6 py-2 rounded-full btn-md hover:bg-green-600 shadow-md">
                    {{ t('compress.compress_single.compress_btn') }}
                </button>
                <button @click="goBack()"
                    class="bg-gray-300 dark:bg-zinc-700 btn border-none text-white px-6 py-2 rounded-full btn-md hover:bg-gray-400 dark:hover:bg-zinc-600 shadow-md">
                    {{ t('common.btn_back') }}
                </button>
            </div>

            <!-- 右侧压缩后的图片信息 -->
            <div class="border border-neutral-200 dark:border-zinc-800 p-4 rounded-lg shadow-sm bg-white dark:bg-zinc-900/50 flex flex-col justify-between min-h-[300px]">
                <div>
                    <h2 class="text-lg font-bold mb-3">{{ t('compress.compress_single.compressed_title') }}</h2>
                    <div v-if="compressedImage" class="flex flex-col items-center">
                        <img :src="compressedInfo.img" alt="" class="w-24 h-24 object-cover mb-3 rounded shadow-sm">
                        <ul class="break-all w-full text-xs md:text-sm space-y-1 text-zinc-600 dark:text-zinc-400">
                            <li><strong>{{ t('compress.compress_single.size') }}:</strong> {{ compressedInfo.size }}</li>
                            <li><strong>{{ t('compress.compress_single.format') }}:</strong> {{ compressedInfo.format }}</li>
                            <li><strong>{{ t('compress.compress_single.color_mode') }}:</strong> {{ compressedInfo.colorMode }}</li>
                            <li><strong>{{  t('compress.compress_single.file_size') }}:</strong> {{ compressedInfo.formatSize }}</li>
                            <li><strong>{{ t('compress.compress_single.compress_rate') }}:</strong> {{ compressRate }}</li>
                            <li class="cursor-pointer text-blue-500 hover:underline" @click="openFile(compressedInfo.path)"><strong>{{ t('compress.compress_single.path') }}:</strong> {{ compressedInfo.path }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-if="loading" class="flex justify-center items-center">
      <div class="loader"></div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import baseAPI from '@/api/base'
import { compressImageAPI } from '@/api/compress_image'
import message from "@/utils/message";
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();

const loading = ref(false)

const originalImage = ref(null);
const compressedImage = ref(null);

const originalInfo = ref({
    size: '',
    format: '',
    colorMode: '',
    fileSize: '',
    formatSize: '',
    path: '',
    img: '',
});

const compressedInfo = ref({
    size: '',
    format: '',
    colorMode: '',
    fileSize: '',
    formatSize: '',
    path: '',
    img: '',
});

const compressRate = computed(() => {
    if (originalInfo.value.fileSize && compressedInfo.value.fileSize) {
        return (
            (1 - (compressedInfo.value.fileSize / originalInfo.value.fileSize)) * 100
        ).toFixed(2) + "%"
    } else {
        return ""
    }
})


watch(originalImage, async (newVal) => {
    if (newVal) {
        loading.value = true
        const info = await getImageInfo(newVal)
        if (info) {
            originalInfo.value = info
        }
        loading.value = false
    }
})

watch(compressedImage, async (newVal) => {
    if (newVal) {
        loading.value = true
        const info = await getImageInfo(newVal)
        if (info) {
            compressedInfo.value = info
        }
        loading.value = false
    }
})


// 选择文件
const handleSelectFile = async () => {
    const res = await baseAPI("open_file_dialog", false)
    if (res.code === 200) {
        originalImage.value = res["data"]["file_path"]
    }
}

// 压缩图片
const handleCompressImage = async () => {
    console.log(originalImage.value)
    loading.value = true
    const res = await compressImageAPI("single_compress_image", originalImage.value)
    if (res.code === 200) {
        compressedImage.value = res["data"]["save_path"]
        message.success("success")
    }else{
       alert(res.error_msg)
    }
    loading.value = false
}


const getImageInfo = async (img_path) => {
    const res = await compressImageAPI("get_image_info", img_path)
    if (res.code === 200) {
        return res["data"]
    }else{
        alert(res.error_msg)
        return null
    }
}

// 打开文件
const openFile = async (path) => {
    await baseAPI('open_and_select_file', path)
}

const goBack = () => {
    router.back()
}



</script>

<style scoped>
/* 自定义样式 */
ul {
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

.btn.btn-disabled, .btn[disabled], .btn:disabled{
    background-color: #c6c6c6
}
</style>