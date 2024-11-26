<script setup lang="ts">
import { useUserStore } from '~/store/user';
import { useAuthStore } from '~/store/auth';
definePageMeta({
  layout: 'user',
});
const store = useUserStore();
const authStore = useAuthStore();
const cUser = computed(() => store.userInfo);

const dialogProfile = ref(true);

const dialogPhoneNumber = ref(false);
const savePhoneNumber = async (phoneNumber: string) => {
  const result = await store.savePhoneNumber(phoneNumber);
  if (result) {
    dialogPhoneNumber.value = false;
  }
};

const logout = () => {
  authStore.logout();
};

onMounted(async () => {
  await store.getUserInfo();
});
</script>
<template>
  <dialog-users-profile
    v-model="dialogProfile"
    :user="cUser"
    @save-phone-number="savePhoneNumber"
  >
    <template #actions>
      <v-btn color="error" size="x-large" variant="flat" block @click="logout">
        로그아웃
      </v-btn>
    </template>
  </dialog-users-profile>
</template>
