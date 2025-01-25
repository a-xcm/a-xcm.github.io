<script setup>
import { onMounted, ref, reactive } from 'vue'
import useCanvas from '@/hooks/useCanvas'
// 引入图片
// import img from '../assets/kenney_monochrome-pirates/Default/Tiles/tile_0127.png'
const src = '../assets/超级玛丽/resources/graphics/mario_bros.png'
const canvas = useCanvas()
const canvasRef = ref(null)
const x = ref(0)
const y = ref(0)
const distance = 16;
let img = new Image();
onMounted(() => {
    img.addEventListener('load', () => {
        init()
    },false)
    img.src = new URL(src, import.meta.url).href
})
// 初始化绘制
const init = () => {
   drawHero()
}
const drawHero = () => {
    const ctx = canvasRef.value.getContext('2d')

    ctx.drawImage(img, 80,0, 16, 32, 0, 210, 16, 32)
    ctx.drawImage(img, 96,0, 16, 32,16, 210, 16, 32)
    ctx.drawImage(img, 112,0, 16, 32,32, 210, 16, 32)
    ctx.drawImage(img, 128,0, 16, 32,48, 210, 16, 32)
    ctx.drawImage(img, 144,0, 16, 32,64, 210, 16, 32)
}

// 键盘方向键
window.onkeydown = function (e) {
    const ctx = canvasRef.value.getContext('2d')
    switch (e.keyCode) {
        case 37:
            console.log('left')
            if (x.value == 0) return;
            ctx.clearRect(x.value, y.value, 16, 16)
            x.value -= distance
            drawHero()
            break;
        case 38:
            console.log('up')
            if (y.value == 0) return;
            ctx.clearRect(x.value, y.value, 16, 16)
            y.value -= distance
            drawHero()
            break;
        case 39:
            console.log('right')
            if (x.value == 320 - 16) return;
            ctx.clearRect(x.value, y.value, 16, 16)
            x.value += distance
            drawHero()
            break;
        case 40:
            console.log('down')
            if (y.value == 240 - 16) return;
            ctx.clearRect(x.value, y.value, 16, 16)
            y.value += distance
            drawHero()
            break;
    }
}
</script>
<template>
    <layout>
        <div style="text-align: center;">
            <canvas width="320" height="240" ref="canvasRef"></canvas>
            <div>x: {{ x }}</div>
            <div>y: {{ y }}</div>
        </div>
    </layout>
</template>
<style scoped>
canvas {
    border: 1px solid #000;
}
</style>