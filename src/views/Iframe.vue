<script setup>
import { ref, onMounted } from 'vue'
const src = ref('')
const iframe = ref(null)
const h5MenuList= ref([]) 
h5MenuList.value = [
   {targe:'signature',path:'/h5/signature.html',name:'手写签名'}
]
onMounted(()=>{
    src.value = h5MenuList.value[0].path
})
const adjustIframe = () => {
    
    iframe.value.height = window.innerHeight
}

</script>
<template>
    <ul class="menu">
        <li :class="{active:src==item.path}" v-for="item in h5MenuList" :key="item.targe" @click="src=item.path">{{ item.name }}</li>
    </ul>
    <div>
        <iframe ref="iframe" :src="src" frameborder="0" width="100%" @load="adjustIframe()"></iframe>
    </div>
</template>
<style scoped>
.menu{
    padding: 20px;
    li:hover{
        cursor: pointer;
    }
    li.active{
        color: red;
    }
}
</style>