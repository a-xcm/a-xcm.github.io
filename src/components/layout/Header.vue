<script setup>
import { ref } from 'vue';
import { Search,Food } from '@element-plus/icons-vue'
const input = ref('')
const handleSearch = () => {
   if (input.value) {
      console.log(input.value)
   }
}
</script>
<template>
    <div class="header">
        <div>
            <el-icon size="30" ><Food /></el-icon>
        </div>
        <div class="search">

            <el-input placeholder="请输入内容" v-model="input" clearable >
                <!-- append -->
                <template #append>
                    <el-button :icon="Search" @click="handleSearch" />
                </template>
            </el-input>
        </div>
    </div>
</template>
<style scoped>
.header {
    width: 100%;
    max-width: var(--w-1200);
    --el-menu-bg-color: var(--color-background-soft);
    margin: 0 auto;
    display: flex;
    align-items: center;
}
.search{
    width: 300px;
    margin-left: auto;
}
</style>