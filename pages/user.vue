<script setup lang="ts">
import { useUserStore } from '~/store/user';
definePageMeta({
  layout: 'user',
});
const store = useUserStore();
const cUser = computed(() => store.userInfo);

onMounted(async () => {
  await store.getUserInfo();
});
</script>
<template>
  <div>{{ cUser }}</div>
</template>
