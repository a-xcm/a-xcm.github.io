<script setup>
import { ref,onMounted, onUnmounted } from 'vue';

const x = ref(0);
const y = ref(0);
const update = e =>{
    console.log(e);
    x.value = e.pageX;
    y.value = e.pageY;
}
onMounted(()=>window.addEventListener('mousemove',update))
onUnmounted(()=>window.removeEventListener('mousemove',update))
</script>
<template>
    <slot :x="x" :y="y" />
</template>
<style scoped>
</style>