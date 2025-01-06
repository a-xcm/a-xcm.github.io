<script setup>
import { RouterView } from 'vue-router'
import Header from './Header.vue'
import Left from './Left.vue'
import Right from './Right.vue';
import Footer from './Footer.vue'


</script>
<template>
    <div>
        <el-container style="height: 100%;min-height: 100vh;">
            <el-header class="fixed-header">
                <Header />
            </el-header>
            <el-main class="main-content">
                 <slot/>
                </el-main>
           
        </el-container>
    </div>
</template>

<style scoped>

.fixed-header{
    position: sticky;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    background-color: var(--color-background-soft);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
}
.main-content{
    width: var(--w-1200);
    min-width: var(--w-1200);
    padding: 20px;
    margin:0 auto;
    height: 1200px;
}
.footer{
    display: flex;
    align-items: center;
    background-color: var(--color-background-mute);
    color:var(--color-text);
}
</style>