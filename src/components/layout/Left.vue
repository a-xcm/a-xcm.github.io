<script setup>
import { onMounted,ref } from 'vue';
const routes =ref([]);
onMounted(()=>{
    const file = import.meta.glob('../../views/*.vue')
    for (const path in file) {
        const name = path.split('/').pop().replace('.vue', '')
        routes.value.push({
            name,
            path: `/${name}`,
            component: file[path].default
        })
    }
    console.log(routes.value)
})
</script>
<template>
    <ul>
        <li v-for="item in routes"> 
            <router-link :to="item.path">{{item.name}}</router-link>
        </li>
    </ul>
</template>
<style scoped>
ul{
    height: calc(100vh - 60px);
    overflow-y: auto;
    border-right: 1px solid #ccc;
    padding:10px 20px;
    li{
        padding: 10px 0;
    }
}
</style>