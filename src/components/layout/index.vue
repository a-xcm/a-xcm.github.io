<script setup>
import Header from './Header.vue'
import Left from './Left.vue'
import Right from './Right.vue';
import Footer from './Footer.vue'
</script>
<template>
    <div>
        <el-container style="min-height: 100vh;">
            <el-header class="fixed-header">
                <Header />
            </el-header>
            <el-container>
                <el-aside width="200px" class="left-aside">
                    <Left />
                </el-aside>
                <el-main class="main-content">
                 <slot/>
            </el-main>
            </el-container>
            
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
}
.main-content{
    min-width:calc(var(--w-1200) - 200px) ;
    padding: 20px;
    margin:0 auto;
}
.footer{
    min-width: var(--w-1200);
    display: flex;
    align-items: center;
    background-color: var(--color-background-mute);
    color:var(--color-text);
}
</style>