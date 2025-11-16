<script setup lang="ts">
import type { BreadcrumbItemType } from 'antdv-next'

const items: BreadcrumbItemType[] = [
  {
    title: 'Home',
    key: 1,
  },
  {
    key: 2,
    title: 'Application Center',
  },
  {
    key: 3,
    title: 'Application List',
  },
  {
    key: 4,
    title: 'An Application',
  },
]
</script>

<template>
  <a-breadcrumb :items="items">
    <template #titleRender="{ item }">
      <template v-if="item.key === 2 || item.key === 3">
        <a href="">{{ item.title }}</a>
      </template>
    </template>
  </a-breadcrumb>
</template>
