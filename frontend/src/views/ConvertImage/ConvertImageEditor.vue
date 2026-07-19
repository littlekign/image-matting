<template>
    <div class="container mx-auto">
        <ImageEditor :imageUrl="imageUrl" :toolbarOptions="coppedToolbarOptions" />
        <div class="flex justify-center space-x-4 mt-6 flex-wrap gap-y-2 items-center">
            <button @click="goBack()" class="bg-green-500 text-white px-6 py-2 rounded-full text-sm hover:bg-green-600 transition-colors shadow-sm">
                {{ t('common.btn_back') }}
            </button>

            <button class="bg-green-500 text-white px-6 py-2 rounded-full text-sm hover:bg-green-600 transition-colors shadow-sm" @click="handleSelectFile">
                {{ selectFile ? t('common.btn_reselect') : t("convert.convert_image.select_btn") }}
            </button>

            <select v-model="selectFileType" class="select select-bordered select-sm w-32 px-4 h-9 min-h-0 rounded-full text-sm">
                <option v-for="item in imageTypes" :value="item" :key="item">{{ item }}</option>
            </select>

            <button :disabled="!selectFile" @click="handleConvertImage"
                class="bg-blue-500 btn border-none text-white px-6 py-2 rounded-full h-9 min-h-0 text-sm hover:bg-blue-600 shadow-sm flex items-center justify-center">
                {{ t("convert.convert_image.convert_btn") }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from "vue"
import ImageEditor from "@/views/components/ImageCroperView.vue";
// 路由to 转换页面
import { useRouter } from "vue-router"
import { useI18n } from "vue-i18n"
import { convertImageAPI } from "@/api/convert_image"
import baseAPI from "@/api/base";
import message from "@/utils/message";

const { t } = useI18n()

const router = useRouter()

const imageUrl = ref("")
const selectFile = ref("")
const selectFileType = ref("PNG")

const coppedToolbarOptions = ref({
    move: true,
    crop: false,
    cancel: false,
    confirm: false,
    zoomIn: true,
    zoomOut: true,
    rotateLeft: false,
    rotateRight: false,
    flipHorizontal: false,
    flipVertical: false,
    background: false,
    delete: false,
    play: false,
});


const imageTypes = ["PNG", "JPEG", "GIF", "BMP", "WEBP", "ICO", "ICNS", "TIFF", "PDF"]

// 根据图片路径获取base64数据
const getFileLocalBase64 = async (filePath) => {
    const result = await baseAPI("get_local_file_base64", filePath);
    if (result.code === 200) {
        return result.data.base64_image;
    } else {
        message.error(result.error_msg);
        return "";
    }
};

const goBack = () => {
    router.back();
};

const handleSelectFile = async () => {
    const res = await baseAPI("open_file_dialog", false)
    if (res.code === 200) {
        selectFile.value = res["data"]["file_path"]
    }
}

// 监听文件路径变化
watch(selectFile, async (newVal) => {
    if (newVal) {
        imageUrl.value = await getFileLocalBase64(newVal)
    }
})

//   转换图片
const handleConvertImage = async () => {
    const res = await convertImageAPI("get_convert_image", { "input_path": selectFile.value, "output_format": selectFileType.value })
    if (res.code === 200) {
        message.info("success")
    } else {
        message.error(res.error_msg)
    }
}


</script>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
}
.btn.btn-disabled, .btn[disabled], .btn:disabled{
    background-color: #c6c6c6
}
</style>