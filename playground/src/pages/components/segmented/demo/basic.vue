<docs lang="zh-CN">
最简单的用法。
</docs>

<docs lang="en-US">
The most basic usage.
</docs>

<template>
  <a-segmented v-model:value="value" :options="['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']" @change="(value) => console.log(value)" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const value = ref('Daily');
</script>
