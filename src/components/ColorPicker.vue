<script setup>
import { ref } from 'vue'

const color = ref('#ff0000')
</script>
<template>
    <div>ColorPicker</div>
    <input v-model="color" type="color"  />
</template>
<style scoped>
input[type="color"]{
    appearance:none;
    padding: 0;
    border: none;
    outline: none;
    background: transparent;
    cursor: pointer;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border: none;
}
input[type="color"]::-webkit-color-swatch {
  border: none;
}
input[type="color"] {
  width: 120px;
  height: 30px;
}
</style>