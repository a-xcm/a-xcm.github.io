<script setup>
import { useRouter } from 'vue-router'
// 获取全部路由组件
const router = useRouter()
console.log(router.getRoutes())
</script>
<template>
  <layout>
   <div class="home">1234</div>
  </layout>
</template>
<style scoped>

</style>