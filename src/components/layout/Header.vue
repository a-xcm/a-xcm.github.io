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
    <el-menu :default-active="activePath" mode="horizontal"
    class="menu"
    >
        <el-menu-item v-for="item in menuList" :key="item.path" :index="item.path">
            <router-link :to="item.path">{{ item.name }}</router-link>
        </el-menu-item>
    </el-menu>
</template>
<style scoped>
.menu {
    --el-menu-bg-color: var(--color-background-soft);
    width: var(--w-1200);
    min-width: var(--w-1200);
    margin: 0 auto;
}
</style>