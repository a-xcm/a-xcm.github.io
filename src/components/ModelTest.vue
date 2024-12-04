<template>
    <div>
      <input v-model="model"/>
      <ul>
        <li v-if="!items.length">
          loading...
        </li>
        <li v-for="item in items" :key="item" @click="handleItem(item)">
          <slot name="item" v-bind="item"></slot>
        </li>
      </ul>
    </div>
  </template>

  <script setup>
  const model = defineModel();
  defineProps(['items']);
  const emit = defineEmits(['handleItem']);
  const handleItem = (item) => {
    emit('handleItem', item);
  }
  </script>
  
  <style scoped lang="scss">
  
  </style>