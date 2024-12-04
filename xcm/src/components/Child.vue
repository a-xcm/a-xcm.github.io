<script setup>
    import { inject } from 'vue'
    import { injectionKey } from '../utils/keys'
    const injected = inject(injectionKey)
</script>
<template>
    <div>Child:{{injected}}</div>
</template>
<style scoped>
</style>