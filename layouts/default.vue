<script setup lang="ts">
import Alert from '~/components/dialog/Alert.vue';
import Confirm from '~/components/dialog/Confirm.vue';
</script>
<template>
  <Alert />
  <Confirm />
  <slot />
</template>
