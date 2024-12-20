<script setup>
import { login } from '@/api/user' 
import { ref, reactive, toRefs, onMounted, watch } from 'vue'
onMounted( async ()=>{
  let res = await login({username:'admin',password:'123456'})
  console.log(res.data)
})
</script>
<template>
</template>
<style scoped>
</style>