<script setup>
import { ref, watch } from 'vue';
import { RouterLink,useRoute } from 'vue-router';
const menuList = ref([
    { name: '首页', path: '/' },
    { name: '关于', path: '/about' },
    { name: '其他', path: '/other' },
])
const activePath = ref('/');
const $route = useRoute();
watch(() => $route.path, (newVal) => {
    activePath.value = newVal;
})
</script>
<template>
    <div class="header">
        header
    </div>
</template>
<style scoped>
.header {
    --el-menu-bg-color: var(--color-background-soft);
    width: var(--w-1200);
    min-width: var(--w-1200);
    margin: 0 auto;
    margin-left: 300px;
    text-align: center;
}
</style>