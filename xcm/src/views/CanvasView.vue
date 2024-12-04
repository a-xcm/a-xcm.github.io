<script setup>
import { onUnmounted } from 'vue';
import TheCanvas from '../components/TheCanvas.vue'
import { ref } from 'vue'
const CTX = ref(null)
const init = (ctx) => {
    CTX.value = ctx
    window.requestAnimationFrame(draw)
}
const number = ref(0)
const draw = () => {
    CTX.value.clearRect(0,0,200,200)
    CTX.value.fillStyle = 'red'
    CTX.value.fillText(number.value, 10, 50)
    number.value++
    if(number.value > 100){
        number.value = 0
        window.cancelAnimationFrame(draw)
        return
    }
    window.requestAnimationFrame(draw)
}
onUnmounted(() => window.cancelAnimationFrame(draw))
</script>
<template>
    <the-canvas :width="200" :height="200" @initCanvas="init"></the-canvas>
</template>
<style scoped>
</style>