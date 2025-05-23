<template>
  <div class="pdf-viewer">
    <div v-if="loading">正在加载 PDF...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <canvas
      ref="canvasRef"
      class="pdf-canvas"
    ></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as pdfjsLib from 'pdfjs-dist'

// 设置 worker 路径
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).href

// props
const props = defineProps({
  pdfUrl: {
    type: String,
    required: true
  },
  pdfScale: {
    type: Number,
    default: 1
  },
  pageNum: {
    type: Number,
    default: 1
  }
})

// emits
const emit = defineEmits(['update:pdfScale', 'update:pageNum', 'update:pagesCount', 'error'])

// refs
const canvasRef = ref(null)
const currentPageNumber = ref(1)
const pagesCount = ref(0)
const loading = ref(false)
const error = ref(null)

let currentLoadingTask = null

// 获取并渲染 PDF 页面
const renderPage = (pageNumber, scale) => {
  if (!canvasRef.value || !props.pdfUrl) return

  // 清除上一次绘制内容
  const canvas = canvasRef.value
  const context = canvas.getContext('2d')
  context.clearRect(0, 0, canvas.width, canvas.height)

  loading.value = true
  error.value = null

  try {
    const loadingTask = pdfjsLib.getDocument(props.pdfUrl)
    currentLoadingTask = loadingTask

    loadingTask.promise.then(pdf => {
      pagesCount.value = pdf.numPages
      emit('update:pagesCount', pdf.numPages)

      pdf.getPage(pageNumber).then(page => {
        const viewport = page.getViewport({ scale })
        canvas.height = viewport.height
        canvas.width = viewport.width

        page.render({
          canvasContext: context,
          viewport
        }).promise.then(() => {
          loading.value = false
        }).catch(renderError => {
          loading.value = false
          error.value = '页面渲染失败：' + renderError.message
          emit('error', renderError)
        })
      }).catch(pageError => {
        loading.value = false
        error.value = '页面加载失败：' + pageError.message
        emit('error', pageError)
      })
    }).catch(loadError => {
      loading.value = false
      error.value = 'PDF 加载失败：' + loadError.message
      emit('error', loadError)
    })
  } catch (e) {
    loading.value = false
    error.value = '未知错误：' + e.message
    emit('error', e)
  }
}

// 响应 url / pageNum / scale 的变化
watch(() => props.pdfUrl, () => {
  currentPageNumber.value = 1
  renderPage(currentPageNumber.value, props.pdfScale)
})

watch(() => props.pageNum, (newVal) => {
  currentPageNumber.value = newVal
  renderPage(newVal, props.pdfScale)
})

watch(() => props.pdfScale, (newVal) => {
  emit('update:pdfScale', newVal)
  renderPage(currentPageNumber.value, newVal)
})

// 提供外部访问的方法
defineExpose({
  pdfViewer: {
    get currentPageNumber() {
      return currentPageNumber.value
    },
    set currentPageNumber(val) {
      currentPageNumber.value = val
      emit('update:pageNum', val)
    },
    get pagesCount() {
      return pagesCount.value
    }
  }
})

onMounted(() => {
  renderPage(props.pageNum, props.pdfScale)
})

onUnmounted(() => {
  if (currentLoadingTask) {
    currentLoadingTask.destroy()
    currentLoadingTask = null
  }
})
</script>

<style scoped>
.pdf-viewer {
  position: relative;
  width: 100%;
  min-height: 300px;
  background-color: #f9f9f9;
}

.pdf-canvas {
  display: block;
  margin: auto;
  border: 1px solid #ccc;
  background-color: white;
}

.error {
  color: red;
  text-align: center;
}
</style>