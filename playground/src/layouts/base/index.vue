<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/layouts/base/header.vue'

const route = useRoute()
const isDemos = computed(() => route.path.startsWith('/~demos'))
</script>

<template>
  <a-config-provider>
    <a-app class="w-full">
      <Header v-if="!isDemos" />
      <slot />
    </a-app>
  </a-config-provider>
</template>
