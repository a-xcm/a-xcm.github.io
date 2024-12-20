<script setup>
import { ref, onMounted, reactive, h,watch } from 'vue';
import BaseTable from '@/components/BaseTable.vue'
const tableData = ref([])
const columns = ref([])
const options = reactive({paginationConfig:{}})
const listeners = reactive({
    'cell-click': (row, colum) => {
        console.log('row click', row, colum)
        options.border = options.hasOwnProperty('border') ? !options.border : false
        
    }
})
onMounted(() => {
    tableData.value = [
        { id: 1, name: 'John', age: 20 },
        { id: 2, name: 'Mary', age: 21 },
        { id: 3, name: 'Bob', age: 22 },
    ]
    columns.value = [
        {
            label:'index',
            type:'index',
            width:80
        },
        { label: 'ID', prop: 'id' },
        {
            label: 'Name', prop: 'name',
            render: ({row,index}) => {
                return h('span', { style: { color: 'red' } }, row.name)
            },
            headerRender: ({column,index}) => {
                return h('div', { style: { color: 'blue' } }, column.label)
            }
        },
        {
            label: 'Age',
            prop: 'age',
            slot: 'ageSlot',
            headerSlot: 'ageHeaderSlot'
        },
    ]
})
const currentPage = ref(1)
const pageSize = ref(30)
watch(() => currentPage.value, (newVal, oldVal) => {
    console.log('outcurrentPage', newVal, oldVal)
})
watch(() => pageSize.value, (newVal, oldVal) => {
    console.log('outpageSize', newVal, oldVal)
})
</script>

<template>
    <base-table 
    :tableData="tableData" 
    :columns="columns" 
    :options="options" 
    :listeners="listeners"
    v-model:currentPage="currentPage"
    v-model:pageSize="pageSize"
    >
        <template #ageSlot="{ row, index }">
            {{ row.age }}岁
        </template>
        <template #ageHeaderSlot="{ column }">
            {{ column.label }}多大了
        </template>
    </base-table>
    <div>
        测试按钮
        <el-button @click="pageSize=10">pagesize = 10</el-button>
        <el-button @click="pageSize=30">pagesize = 30</el-button>
    </div>
</template>
<style scoped></style>