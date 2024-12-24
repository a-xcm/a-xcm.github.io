<template>
  <div>
    <ModelTest v-model="msg" :items="items" @handle-item="handleItem">
      <template #item="{a,b}">
        <div>{{a+'-'+b}}</div>
      </template>
    </ModelTest>
    <div>{{msg}}</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ModelTest from "../components/ModelTest.vue";
const msg = ref("value")
const items = ref([])
setTimeout(() => {
  items.value = [
    {a:1,b:2},
    {a:3,b:4},
  ]
}, 2000);
const handleItem = (item) => {
  console.log(item)
}
</script>

<style scoped lang="scss">

</style>
