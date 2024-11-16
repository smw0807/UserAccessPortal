<!-- ROLE : USER LAYOUT -->
<script setup lang="ts">
import Alert from '~/components/dialog/Alert.vue';
import Confirm from '~/components/dialog/Confirm.vue';
import { useUserStore } from '~/store/user';
const { hasToken } = useAuth();
const router = useRouter();
if (!hasToken()) {
  router.replace('/login');
}
const userStore = useUserStore();

const isAdmin = await userStore.checkAdminUser();
if (isAdmin) {
  router.replace('/');
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
