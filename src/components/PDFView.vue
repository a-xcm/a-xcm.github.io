<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
const canvasRef = ref(null)
import * as pdfjsLib from 'pdfjs-dist'

// 实现pdf预览
onMounted(() => {
    console.log('canvasRef', canvasRef.value)
    if (canvasRef.value) {
        pdfjsLib.GlobalWorkerOptions.workerSrc = ''

    }
})
const getPDF = async () => {
    try {
        
    }catch (error) {
    }
}
</script>
<template>
    <canvas ref="canvasRef"></canvas>
</template>
<style scoped>
</style>