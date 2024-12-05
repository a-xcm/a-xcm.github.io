import { ref } from 'vue'
export default function useTable(){
   const tableData = ref([])
   const columns = ref([])
   const loading = ref(false)
  
   return {tableData,columns,loading}
}