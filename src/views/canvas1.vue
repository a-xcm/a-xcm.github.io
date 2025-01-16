<script setup>
import { onMounted, ref,reactive } from 'vue'
// import useCanvas from '@/hooks/useCanvas'
// const canvas1 = useCanvas()
const canvasRef = ref(null)
import * as createjs from '@createjs/easeljs';
onMounted(() => {
    const canvas = canvasRef.value
    const stage = new createjs.Stage(canvas);
    const circle = new createjs.Shape();
    circle.graphics.beginFill("#FF0000").drawCircle(0, 0, 50);
    circle.x = 100;
    circle.y = 100;
    stage.addChild(circle);
    stage.update();
})

</script>
<template>
    <layout>
        <canvas width="500" height="300" ref="canvasRef"></canvas>
    </layout>
</template>
<style scoped>
canvas{
    border: 1px solid #000;
}
</style>