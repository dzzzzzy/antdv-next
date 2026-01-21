<docs lang="zh-CN">
这个例子通过简单的 ajax 读取方式，演示了如何从服务端读取并展现数据，具有筛选、排序等功能以及页面 loading 效果。开发者可以自行接入其他数据处理方式。

另外，本例也展示了筛选排序功能如何交给服务端实现，列不需要指定具体的 `onFilter` 和 `sorter` 函数，而是在把筛选和排序的参数发到服务端来处理。

当使用 `rowSelection` 时，请设置 `rowSelection.preserveSelectedRowKeys` 属性以保留 `key`。

**注意，此示例使用 [模拟接口](https://mocky.io)，展示数据可能不准确，请打开网络面板查看请求。**

> 🛎️ 想要 3 分钟实现？试试 [ProTable](https://procomponents.ant.design/components/table)！
</docs>

<docs lang="en-US">
This example shows how to fetch and present data from a remote server, and how to implement filtering and sorting in server side by sending related parameters to server.

Setting `rowSelection.preserveSelectedRowKeys` to keep the `key` when enable selection.

**Note, this example use [Mock API](https://mocky.io) that you can look up in Network Console.**
</docs>

<script setup lang="ts">
import type { TableProps } from 'antdv-next'
import { reactive, ref } from 'vue'

interface DataType {
  key: string
  name: string
  age: number
  address: string
}

const columns: TableProps['columns'] = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
]

const loading = ref(false)
const dataSource = ref<DataType[]>([])

const pagination = reactive({
  current: 1,
  pageSize: 5,
  total: 0,
  showSizeChanger: true,
})

function makeData(page: number, pageSize: number) {
  const data: DataType[] = []
  for (let i = 0; i < pageSize; i++) {
    const index = (page - 1) * pageSize + i + 1
    data.push({
      key: `${index}`,
      name: `Edward ${index}`,
      age: 20 + (index % 10),
      address: `London, Park Lane no. ${index}`,
    })
  }
  return data
}

function fetchData() {
  loading.value = true
  const { current, pageSize } = pagination
  setTimeout(() => {
    dataSource.value = makeData(current, pageSize)
    pagination.total = 46
    loading.value = false
  }, 500)
}

function handleTableChange(pager: any) {
  console.log(pager)
  pagination.current = pager.current
  pagination.pageSize = pager.pageSize
  fetchData()
}

fetchData()
</script>

<template>
  <a-table
    :columns="columns"
    :data-source="dataSource"
    :pagination="pagination"
    :loading="loading"
    @change="handleTableChange"
  />
</template>
