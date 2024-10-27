<script setup lang="ts">
import Alert from '~/components/dialog/Alert.vue';
import Confirm from '~/components/dialog/Confirm.vue';
</script>
<template>
  <v-app>
    <v-main class="d-flex align-center justify-center">
      <Alert />
      <Confirm />
      <slot />
    </v-main>
  </v-app>
</template>
