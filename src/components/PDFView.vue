<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

import * as pdfjsLib  from 'pdfjs-dist'
// import * as pdfWorker from 'pdfjs-dist/build/pdf.worker.mjs'
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs', 
  import.meta.url
).href;
// 传入参数
const props = defineProps({
    pdfUrl: {
        type: String,
        default: ''
    },
    pdfScale: {
        type: Number,
        default: 1
    },
    pageNum: {
        type: Number,
        default: 1
    }
});
const canvasRef = ref(null)
//检测props的变化
watch(()=>props.pdfScale,()=>{
    if(canvasRef.value)
    pdfLoad()
})

watch(()=>props.pdfUrl,()=>{
    if(canvasRef.value)
    pdfLoad()
})
const pdfLoad = ()=>{
    console.log('pdfLoad');
        let loadingTask = pdfjsLib.getDocument(props.pdfUrl)
        loadingTask.promise.then(pdf => {
            console.log('pdf load', pdf);
            pdf.getPage(props.pageNum).then(page => {
                console.log('page load', page);
                let viewport = page.getViewport({
                    scale: props.pdfScale
                })
                console.log('viewport', viewport);
                let canvas = canvasRef.value
                let context = canvas.getContext('2d')
                canvas.height = viewport.height
                canvas.width = viewport.width
                page.render({
                    canvasContext: context,
                    viewport: viewport
                }).promise.then(() => {
                    console.log('render success')
                })
            })
        },(reason) => {
            console.log('pdf load fail', reason)
        })
}
// 实现pdf预览
onMounted(() => {
    pdfLoad()
})
</script>
<template>
    <canvas ref="canvasRef"></canvas>
</template>
<style scoped>
div{
    /* 过渡色 #24AADF 到 #2572BA*/
    background-color: linear-gradient(to right, #24AADF, #2572BA);
}
</style>