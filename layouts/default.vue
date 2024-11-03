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
  <Alert />
  <Confirm />
  <slot />
</template>
