<script setup>
// import MouseTracker from '../components/MouseTracker.vue';
// import Parent from '../components/Parent.vue';
// import { provide } from 'vue';
// import { injectionKey } from '../utils/keys';
// provide(injectionKey, 'provided value');
import { useMouse } from '../hooks/mouse'
const { x, y } = useMouse()

</script>
<template>
    <!-- <mouse-tracker v-slot="{ x, y }">
        Mouse position: ({{ x }}, {{ y }})
    </mouse-tracker>
    <Parent></Parent> -->
    <div> 
        Mouse position: ({{ x }}, {{ y }})
    </div>
   
    <div class="box">
        <div class="box-inner">
            <img src="http://hepengwei.cn/images/d2fa7cd8.png" alt="">
        </div>
    </div>
</template>
<style scoped>
*{
    --width: 200px;
    --height: 200px;
    --b:5px;
}
.box-inner{
    width: var(--width);
    height: var(--height);
    border: var(--b) solid #000;
    border-radius: 50%;
}
img{
    width: 100%;
    transition: scale 0.5s ease;
    clip-path: circle(50% at 50% 50%);
}
img:hover{
    scale: 1.5;
    clip-path: circle(70% at 50% 50%);
}
</style>