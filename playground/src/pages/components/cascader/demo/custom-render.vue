<script setup lang="ts">
import type { CascaderProps } from 'antdv-next'
import { h } from 'vue'

interface Option {
  value: string
  label: string
  children?: Option[]
  code?: number
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
            code: 752100,
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
            label: 'Zhong Hua Men',
            code: 453400,
          },
        ],
      },
    ],
  },
]

function handleAreaClick(e: MouseEvent, label: string, option: Option) {
  e.stopPropagation()
  console.log('clicked', label, option)
}

const displayRender: CascaderProps<Option>['displayRender'] = (labels, selectedOptions = []) =>
  labels.map((label, index) => {
    const option = selectedOptions[index] as Option | undefined
    if (index === labels.length - 1 && option) {
      return h(
        'span',
        { key: option.value },
        [
          label,
          ' (',
          h(
            'a',
            {
              onClick: (e: MouseEvent) => handleAreaClick(e, String(label), option),
            },
            option.code,
          ),
          ')',
        ],
      )
    }
    return h('span', { key: option?.value ?? String(label) }, [label, ' / '])
  })

const optionRender: CascaderProps<Option>['optionRender'] = option =>
  h('span', null, `${option.label} (${option.value})`)
</script>

<template>
  <a-cascader
    :options="options"
    :default-value="['zhejiang', 'hangzhou', 'xihu']"
    :display-render="displayRender"
    :option-render="optionRender"
    style="width: 100%"
  />
</template>
