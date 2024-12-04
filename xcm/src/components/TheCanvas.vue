<script setup>
    import { ref, onMounted } from 'vue'
    const prop = defineProps({
        width: {
            type: Number,
            default: 200
        },
        height: {
            type: Number,
            default: 200
        }
    })
    const emit = defineEmits(['initCanvas'])
    const canvas = ref(null)
    onMounted(() => {
        if(canvas.value.getContext){
            const ctx = canvas.value.getContext('2d')
            emit('initCanvas', ctx)
        }else{
            console('canvas not supported')
        }
        
    })
     //重置左下为原点
  const originReset = (ctx) => {
    ctx.scale(1, -1);
    ctx.translate(0, -H);

  };
  //绘制坐标轴
  const drawAxis = (ctx,step) => {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(W,0);
    for(let i=10;i<=W;i+=step){
      ctx.moveTo(i,0)
      ctx.lineTo(i,5)
    }
    ctx.moveTo(0,0)
    ctx.lineTo(0,H)
    for(let i=10;i<=H;i+=step){
      ctx.moveTo(0,i)
      ctx.lineTo(5,i)
    }
    ctx.closePath()
    ctx.stroke()
  };
</script>
<template>
    <canvas ref="canvas" :width="prop.width" :height="prop.height">
        canvas not supported
    </canvas>
</template>
