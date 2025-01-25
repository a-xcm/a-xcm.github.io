<script setup>
import Header from './Header.vue'
import Footer from './Footer.vue'
</script>
<template>
    <div>
        <el-container style="min-height: 100vh;">
            <el-header class="fixed-header">
                <Header />
            </el-header>
            <el-main class="main-content">
                 <slot/>
                 <el-backtop :right="100" :bottom="100" />
            </el-main>            
           <el-footer class="footer">
               <Footer />
           </el-footer>
        </el-container>
    </div>
</template>

<style scoped>

.fixed-header{
    min-width: var(--w-1200);
    background-color: var(--color-background-soft);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    align-items: center;
    position: sticky;
    top: 0;
    box-shadow: var(--box-shadow);
}
.footer{
    min-width: var(--w-1200);
    display: flex;
    align-items: center;
    background-color: var(--color-background-mute);
    color:var(--color-text);
}
</style>