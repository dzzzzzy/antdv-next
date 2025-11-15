<script setup lang="ts">
import { notification } from 'antdv-next'

function openNotification() {
  notification.open({
    title: 'Notification Title',
    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    onClick: () => {
      console.log('Notification Clicked!')
    },
    duration: 0,
  })
}
</script>

<template>
  <a-button type="primary" @click="openNotification">
    Open the notification box
  </a-button>
</template>
