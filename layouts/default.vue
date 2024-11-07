<script setup lang="ts">
import Alert from '~/components/dialog/Alert.vue';
import Confirm from '~/components/dialog/Confirm.vue';
import { useUserStore } from '~/store/user';
const { hasToken } = useAuth();
const router = useRouter();
if (!hasToken()) {
  router.replace('/login');
}
// 어드민 유저 체크
const { checkAdminUser } = useUserStore();

const isAdmin = await checkAdminUser();
if (!isAdmin) {
  router.replace('/user');
}
</script>
<template>
  <Alert />
  <Confirm />
  <slot />
</template>
