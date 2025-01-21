<script setup>
import { ref } from 'vue'
// PDFView
import PdfView from '@/components/PDFView.vue'
const pdfUrl = ref('http://localhost:3000/file/down/收据1.pdf') 
const pdfScale = ref(1)
const pdfViewRef = ref(null)
const pagScale = ()=> {
    pdfScale.value = pdfScale.value + 0.2
}
// 缩小
const pagScaleDown = ()=> {
    if(pdfScale.value < 0.5) return
    pdfScale.value = pdfScale.value - 0.2
}
</script>
<template>
    <div>
        <div>pdf预览</div>
        <!-- 下载 -->
        <div>
            <a :href="pdfUrl">下载</a>
        </div>
        <!-- 放大缩小 -->
        <el-button type="primary" @click="pagScale">放大</el-button>
        <el-button type="primary" @click="pagScaleDown">缩小</el-button>
        <div>
            <PdfView ref="pdfViewRef" :pdfUrl="pdfUrl"  :pdfScale="pdfScale" :pageNum="1" />
        </div>
    </div>
</template>
<style scoped>
</style>