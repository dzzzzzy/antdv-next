<docs lang="zh-CN">
给 Segmented Item 设置 Icon。
</docs>

<docs lang="en-US">
Set icon for Segmented Item.
</docs>

<script setup lang="ts">
  import { AppstoreOutlined, BarsOutlined } from '@antdv-next/icons'
  import { h } from 'vue'

  const options = [
    { label: 'List', value: 'List', icon: h(BarsOutlined) },
    { label: 'Kanban', value: 'Kanban', icon: h(AppstoreOutlined) },
  ]

  const options2 = [
    { label: 'List', value: 'List' },
    { label: 'Kanban', value: 'Kanban' },
  ]
</script>

<template>
  <a-segmented :options="options" />
  <br>
  <br>
  <a-segmented :options="options2">
    <template #iconRender="{ value }">
      <template v-if="value === 'List'">
        <BarsOutlined />
      </template>
      <template v-else-if="value === 'Kanban'">
        <AppstoreOutlined />
      </template>
    </template>
  </a-segmented>
</template>
