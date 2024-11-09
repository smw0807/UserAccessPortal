<script setup lang="ts">
import { useUserStore } from '~/store/user';
definePageMeta({
  layout: 'user',
});
const { getUserInfo } = useUserStore();
onMounted(async () => {
  await getUserInfo();
});
</script>
<template>
  <div>user</div>
</template>
