
<template>
    <div>
        <el-table
        ref="tableRef"
        :data="tableData"
        v-bind="_options"
        v-on="_listeners"
        >
            <template v-for="(col,index) in columns" :key="index">
                <!-- 复选框，序号 -->
                <el-table-column 
                    v-if="col.type==='index' || col.type==='selection' || col.type==='expand'"
                    :index="indexMethod"
                    v-bind="col"
                >
                <!-- 当type==expand时，插槽插槽 或配置h函数渲染 -->
                <template  #default="{ row, $index }">
                    <component v-if="col.render" :is="col.render" :row="row" :index="$index"></component>
                    <slot v-else-if="col.slot" :name="col.slot" :row="row" :index="$index"></slot>
                </template>
                <template #header="scope">
                    <component v-if="col.headerRender" :is="col.headerRender" :scope="scope"></component>
                    <slot v-else-if="col.headerSlot" :name="col.headerSlot" :scope="scope"></slot>
                </template>
                </el-table-column>
                <el-table-column 
                v-else
                v-bind="col"
                >
                <template  #default="{ row, $index }">
                    <component v-if="col.render" :is="col.render" :row="row" :index="$index"></component>
                    <slot v-else-if="col.slot" :name="col.slot" :row="row" :index="$index"></slot>
                </template>
                <!-- 自定义表头 -->
                <template #header="{column,$index}">
                    <component v-if="col.headerRender" :is="col.headerRender" :column="column" :index="$index"></component>
                    <slot v-else-if="col.headerSlot" :name="col.headerSlot" :column="column" :index="$index"></slot>
                </template>
            </el-table-column>
            </template>
           
        </el-table>

        <!-- 分页器 -->
        <div v-if="_options.showPagination">
            <el-pagination
               v-bind="_paginationConfig"
               v-model:current-page="currentPage"
               v-model:page-size="pageSize"
            />

        </div>
    </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
// import { useTable } from '@/hooks/useTable'
const props = defineProps({
    tableData:{type:Array,default:()=>[]},
    columns:{type:Array,default:()=>[]},
    options:{type:Object,default:()=>{}},
    listeners:{type:Object,default:()=>{}},
    pageSize:{type:Number,default:10},
    currentPage:{type:Number,default:1}
})
const emit = defineEmits(['update:currentPage','update:pageSize'])
const pageSize = ref(props.pageSize)
const currentPage = ref(props.currentPage)
watch(()=>props.currentPage,()=>{currentPage.value = props.currentPage})
watch(()=>props.pageSize,()=>{pageSize.value = props.pageSize})
watch(()=>pageSize.value,()=>{
    emit('update:pageSize',pageSize.value)
})
watch(()=>currentPage,()=>{
    emit('update:currentPage',currentPage)
})
const indexMethod = (index)=>{
    const tabIndex = index + (currentPage.value - 1) * pageSize.value + 1
    return tabIndex
}
const tableRef = ref(null)
const _options = computed(()=>{
    const option = {
        stripe:false,
        tooltipEffect:'dark',
        showHeader:true,
        showPagination:true,
        border:true,
        rowStyle:()=>'cursor:pointer'
    }
    return Object.assign(option,props.options)
})
const _listeners = computed(()=>{
    const listeners = {
       
    }
    return Object.assign(listeners,props?.listeners)
})
const _paginationConfig = computed(()=>{
    const config = {
        layout:'prev, pager, next, jumper, ->, sizes, total',
        total:0,
        background:true,
        hideOnSinglePage:true,
        pagerCount:5,
        pageSizes:[10,20,30,50,100],
        small:false,
        background:false,
    }
    return Object.assign(config,_options.value?.paginationConfig)
})


defineExpose({
    tableRef
})
</script>
<style scoped>
</style>
