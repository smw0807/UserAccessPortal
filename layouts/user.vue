<!-- ROLE : USER LAYOUT -->
<script setup lang="ts">
import Alert from '~/components/dialog/Alert.vue';
import Confirm from '~/components/dialog/Confirm.vue';
const { hasToken } = useAuth();
const router = useRouter();
if (!hasToken()) {
  router.replace('/login');
}
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
