import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import BaseTable from '../BaseTable.vue'
import { ElTable, ElTableColumn, ElPagination } from 'element-plus'
import { ref, computed, watch } from 'vue'

describe('BaseTable', () => {
  it('renders properly', () => {
   const columns = [
      { type: 'index'},
      { prop: 'name', label: 'Name' },
      { prop: 'age', label: 'Age' },
      { prop: 'address', label: 'Address' },
    ];
    const tableData = [
      { name: 'John', age: 30, address: 'New York' },
      { name: 'Jane', age: 28, address: 'Los Angeles' },
      { name: 'Jim', age: 35, address: 'Chicago' },
    ];
    const wrapper = mount(BaseTable, {
      props: {
        columns,
        tableData,
      },
      global: {
        components: {
          ElTable,
          ElTableColumn,
          ElPagination,
        },
      },
    })
    expect(wrapper.findAll('.el-table__column').length)
    console.log(wrapper.findAll('.el-table__column--index').length)
  })
})