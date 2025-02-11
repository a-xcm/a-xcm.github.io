<template>
    <div>
      <Signature
        v-model="signature"
        @confirm="handleConfirm"
        @clear="handleClear"
        :width="400"
        :height="300"
      />
      <img v-if="signature" :src="signature" class="preview" />
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import Signature from '../components/Signature.vue'
  
  const signature = ref('')
  
  const handleConfirm = (dataURL) => {
    console.log('确认签名:', dataURL)
  }
  
  const handleClear = () => {
    console.log('签名已清除')
  }
  </script>
  
  <style>
  .preview {
    margin-top: 20px;
    border: 1px solid #eee;
    max-width: 400px;
  }
  </style>