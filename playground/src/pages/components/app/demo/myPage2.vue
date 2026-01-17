<script setup lang="ts">
  import { App } from 'antdv-next'

  const { message, modal, notification } = App.useApp();

  const showMessage = () => {
    message.success('Success!');
  };

  const showNotification = () => {
    notification.info({
      title: 'Notification',
      description: 'Hello, Ant Design!!',
    });
  };
</script>

<template>
  <a-space wrap>
    <a-button type="primary" @click="showMessage">
      Message for only one
    </a-button>
    <a-button type="primary" @click="showNotification">
      Notification for bottomLeft
    </a-button>
  </a-space>
</template>
