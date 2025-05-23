<template>
  <div>
    <div>PDF 预览</div>

    <!-- 文件上传 -->
    <input type="file" @change="handlePdfUpload" accept=".pdf" />

    <!-- 当前 PDF URL -->
    <div>pdfUrl: {{ pdfUrl }}</div>

    <!-- 分页控制 -->
    <button @click="goToPrevPage">上一页</button>
    <button @click="goToNextPage">下一页</button>

    <!-- 下载按钮 -->
    <div>
      <a :href="pdfUrl" download>下载</a>
    </div>

    <!-- 缩放控制 -->
    <el-button type="primary" @click="zoomIn">放大</el-button>
    <el-button type="primary" @click="zoomOut">缩小</el-button>

    <!-- PDF 显示组件 -->
    <div>
      <PdfView ref="pdfViewRef" v-model:pdf-url="pdfUrl" v-model:scale="pdfScale" v-model:page="pageNum" 
      v-model:pages-count="totalPages"
    @error="handlePdfError" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PdfView from '@/components/PDFView.vue'

// 状态管理
const pdfUrl = ref('')
const pdfScale = ref(1)
const pageNum = ref(1)
const pdfViewRef = ref(null)
const totalPages = ref(0)
// 处理文件上传
function handlePdfUpload(event) {
  const file = event.target.files[0]
  if (file && file.type === 'application/pdf') {
    pdfUrl.value = URL.createObjectURL(file)
    pageNum.value = 1
    
  } else {
    alert('请选择有效的 PDF 文件')
  }
}
const handlePdfError = (err) => {
  console.error('PDF 错误:', err)
}
// 放大功能
const zoomIn = () => {
  if (pdfScale.value >= 3) return // 最大放大至 3 倍
  pdfScale.value += 0.2
}

// 缩小功能
const zoomOut = () => {
  if (pdfScale.value <= 0.3) return // 最小缩小至 0.3 倍
  pdfScale.value -= 0.2
}

// 上一页
const goToPrevPage = () => {
  if (pageNum.value <= 1) return
  pageNum.value--
  pdfViewRef.value.pdfViewer.currentPageNumber = pageNum.value
}

// 下一页
const goToNextPage = () => {
  if (!pdfViewRef.value || !pdfViewRef.value.pdfViewer) return
  const totalPages = pdfViewRef.value.pdfViewer.pagesCount
  if (pageNum.value >= totalPages) return
  pageNum.value++
  pdfViewRef.value.pdfViewer.currentPageNumber = pageNum.value
}
</script>

<style scoped>
/* 可根据需要添加样式 */
</style>