<script setup>
import { login } from '@/api/user'
import { getImgList } from '@/api/other'
import { ref, reactive, toRefs, onMounted, watch } from 'vue'
const loginFunc = async () => {
  let res = await login()
  console.log(res.data)
}
const getImgListFunc = async () => {
  let res = await getImgList()
  console.log(res)
}
onMounted(()=>{
 loginFunc()
 getImgListFunc()
})

</script>
<template>
  <div>HomeView</div>
</template>
<style scoped>
</style>