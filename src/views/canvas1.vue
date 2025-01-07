<script setup>
import { onMounted, ref } from 'vue'
import useCanvas from '@/hooks/useCanvas'
const canvas1 = useCanvas()
const canvasRef = ref(null)
onMounted(() => {
    const canvas = canvasRef.value
    if(canvas.getContext){
        const ctx = canvas.getContext('2d')
        draw(ctx)
    }else{
        console('canvas not supported')
    }
})

const draw = (ctx) => {
    canvas1.drawBackground(ctx,{color:'#f40'})
    canvas1.drawCircle2(ctx,{x:150,y:150,r:146,color:'#000',lineWidth:2})
    let pi = Math.PI
   
    ctx.save()
    ctx.translate(150,150)
    for (let i = 0; i < 12; i++) {
        let x = Math.cos(pi / 6 * i) * 146
        let y = Math.sin(pi / 6 * i) * 146
        console.log(x,y)
        canvas1.drawLine(ctx,{x:0,y:0,x2:x,y2:y,color:'#000',lineWidth:2})
    }
}

</script>
<template>
    <layout>
        <canvas width="300" height="300" ref="canvasRef"></canvas>
    </layout>
</template>
<style scoped></style>