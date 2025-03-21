<script setup>
import { useRouter } from 'vue-router'
// 获取全部路由组件
const router = useRouter()
console.log(router.getRoutes())
</script>
<template>
  <layout>
   <!-- scan -->
   <router-link to="/scan"> 扫码</router-link>
  </layout>
</template>
<style scoped>

</style>