import { reactive, ref } from 'vue'

export default function usePagination(callback,options) {
    const pagination = reactive({
        currentPage:1,
        total:0,
        pageSize:10,
        pageSizes:[10,20,30,40,50],
        showToTal:true,
        showPageSize:true,
        onPageChange:(currentPage)=>{
            pagination.currentPage = currentPage
            callback && callback()
        },
        onPageSizeChange:(pageSize)=>{
            pagination.pageSize = pageSize
            callback && callback()
        }
    })
    
    const changeCurrent = pagination.onPageChange
    const changePageSize = pagination.onPageSizeChange
    function setTotal(total){
        pagination.total = total
    }
    const { currentPage,pageSize,total } = toRefs(pagination)
    return { 
        pagination,
        changeCurrent,
        changePageSize,
        setTotal,
        currentPage,
        pageSize,
        total 
    }
}

