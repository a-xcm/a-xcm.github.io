<template>
    <div>FileReader</div>
    <input type="file" aria-label="选择文本文件" @change="handleFileSelection" />
<div role="alert" :style="{ color: messageColor }">{{ message }}</div>
 <!-- 显示文本内容 -->
 <pre aria-label="文件内容" v-if="fileType === 'text'">{{ fileContent }}</pre>

<!-- 显示图片 -->
<!-- 显示图片 -->
<img :src="imageUrl" alt="预览图片" v-if="fileType === 'image'" style="max-width: 100%; margin-top: 10px;" />
</template>

<script setup>
import { ref } from 'vue';

const message = ref('');
const messageColor = ref('black');
const fileContent = ref('');
const imageUrl = ref('');
const fileType = ref(null); // 'text' 或 'image'

function showMessage(msg, type) {
    message.value = msg;
    messageColor.value = type === "error" ? "red" : "green";
}

function handleFileSelection(event) {
    const file = event.target.files[0];
    fileContent.value = "";
    imageUrl.value = "";
    fileType.value = null;
    showMessage("", "info");

    if (!file) {
        showMessage("未选择文件。请选择一个文件。", "error");
        return;
    }

    if (!(file.type.startsWith("text") || file.type.startsWith("image"))) {
        showMessage("不支持的文件类型。请选择文本或图片文件。", "error");
        return;
    }

    if (file.size > 1024 * 1024 * 5) { // 图片放宽到5MB
        showMessage("文件过大。请选择小于5MB的文件。", "error");
        return;
    }

    const reader = new FileReader();
    reader.onloadstart = () => {
        showMessage("正在读取文件，请稍候...", "info");
    };

    reader.onload = (e) => {
        if (file.type.startsWith("text")) {
            fileContent.value = e.target.result;
            fileType.value = 'text';
        } else if (file.type.startsWith("image")) {
            imageUrl.value = e.target.result;
            fileType.value = 'image';
        }
        showMessage("文件读取完成。", "info");
    };

    reader.onerror = () => {
        showMessage("读取文件时出错。请重试。", "error");
    };

    if (file.type.startsWith("text")) {
        reader.readAsText(file);
    } else if (file.type.startsWith("image")) {
        reader.readAsDataURL(file);
    }
}
</script>
<style scoped>
#message {
    margin-top: 10px;
}
pre {
    background-color: #f4f4f4;
    padding: 10px;
    border-radius: 4px;
}
</style>