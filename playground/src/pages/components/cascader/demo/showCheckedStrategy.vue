<script setup lang="ts">
import type { CascaderEmits } from 'antdv-next'
import { Cascader } from 'antdv-next'

const SHOW_CHILD = Cascader.SHOW_CHILD

interface Option {
  value: string | number
  label: string
  children?: Option[]
}

const options: Option[] = [
  {
    label: 'Light',
    value: 'light',
    children: Array.from({ length: 20 }).map((_, index) => ({
      label: `Number ${index}`,
      value: index,
    })),
  },
  {
    label: 'Bamboo',
    value: 'bamboo',
    children: [
      {
        label: 'Little',
        value: 'little',
        children: [
          {
            label: 'Toy Fish',
            value: 'fish',
          },
          {
            label: 'Toy Cards',
            value: 'cards',
          },
          {
            label: 'Toy Bird',
            value: 'bird',
          },
        ],
      },
    ],
  },
]

const onChange: CascaderEmits['change'] = (value) => {
  console.log(value)
}
</script>

<template>
  <a-cascader
    style="width: 100%"
    :options="options"
    multiple
    max-tag-count="responsive"
    :show-checked-strategy="SHOW_CHILD"
    :default-value="[
      ['bamboo', 'little', 'fish'],
      ['bamboo', 'little', 'cards'],
      ['bamboo', 'little', 'bird'],
    ]"
    @change="onChange"
  />
  <br>
  <br>
  <a-cascader
    style="width: 100%"
    :options="options"
    multiple
    max-tag-count="responsive"
    :default-value="[['bamboo']]"
    @change="onChange"
  />
</template>
