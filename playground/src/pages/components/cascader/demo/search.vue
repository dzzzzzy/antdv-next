<script setup lang="ts">
import type { CascaderEmits } from 'antdv-next'

interface Option {
  value: string
  label: string
  children?: Option[]
  disabled?: boolean
}

const options: Option[] = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [
      {
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [
          {
            value: 'xihu',
            label: 'West Lake',
          },
          {
            value: 'xiasha',
            label: 'Xia Sha',
            disabled: true,
          },
        ],
      },
    ],
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [
      {
        value: 'nanjing',
        label: 'Nanjing',
        children: [
          {
            value: 'zhonghuamen',
            label: 'Zhong Hua men',
          },
        ],
      },
    ],
  },
]

const onChange: CascaderEmits['change'] = (value, selectedOptions) => {
  console.log(value, selectedOptions)
}

const handleSearch = (value: string) => {
  console.log(value)
}

const filter = (inputValue: string, path: Option[]) =>
  path.some(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
</script>

<template>
  <a-cascader
    :options="options"
    :show-search="{ filter, onSearch: handleSearch }"
    placeholder="Please select"
    @change="onChange"
  />
</template>
