<script setup lang="ts">
import { useUserStore } from '~/store/user';
import { useAuthStore } from '~/store/auth';
import dayjs from 'dayjs';

definePageMeta({
  layout: 'user',
});
const store = useUserStore();
const authStore = useAuthStore();
const cUser = computed(() => store.userInfo);

const loginType = computed(() => {
  if (cUser.value?.type === 'GOOGLE') {
    return '구글';
  } else if (cUser.value?.type === 'KAKAO') {
    return '카카오';
  } else if (cUser.value?.type === 'EMAIL') {
    return '이메일';
  }
  return '-';
});
const userRole = computed(() => {
  if (cUser.value?.role === 'ADMIN') {
    return '관리자';
  } else if (cUser.value?.role === 'USER') {
    return '일반 사용자';
  }
  return '-';
});

const createdAt = computed(() => {
  return dayjs(cUser.value?.createdAt).format('YYYY-MM-DD HH:mm');
});
const updatedAt = computed(() => {
  return dayjs(cUser.value?.updatedAt).format('YYYY-MM-DD HH:mm');
});
const lastLogin = computed(() => {
  return dayjs(cUser.value?.lastLoginAt).format('YYYY-MM-DD HH:mm:ss');
});

const savePhoneNumber = async (phoneNumber: string) => {
  const result = await store.savePhoneNumber(phoneNumber);
  if (result) {
    await store.getUserInfo();
  }
};

const { useConfirm } = useDialog();
const logout = async () => {
  const confirm = await useConfirm({
    type: 'info',
    title: '로그아웃',
    message: '로그아웃 하시겠습니까?',
  });
  if (!confirm) return;
  authStore.logout();
};

onMounted(async () => {
  await store.getUserInfo();
  console.log(cUser.value);
});
</script>
<template>
  <v-card>
    <v-card-text>
      <v-list-item class="te">
        <template v-slot:prepend>
          <v-avatar color="primary" size="100">
            <v-img
              v-if="cUser?.profileImage"
              :src="cUser.profileImage"
              sizes="100"
            />
            <v-icon v-else size="70">mdi-account</v-icon>
          </v-avatar>
        </template>
        <v-list-item-title class="text-h4">{{
          cUser?.name ?? '-'
        }}</v-list-item-title>
        <v-list-item-subtitle class="text-body-1">{{
          cUser?.email ?? '-'
        }}</v-list-item-subtitle>
      </v-list-item>
      <v-divider class="my-4" />
      <v-list>
        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-login</v-icon>
          </template>
          <v-list-item-title>로그인 유형</v-list-item-title>
          <v-list-item-subtitle>{{ loginType }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-cellphone</v-icon>
          </template>
          <v-list-item-title>휴대폰 번호</v-list-item-title>
          <v-list-item-subtitle>{{
            cUser?.phoneNumber ?? '없음'
          }}</v-list-item-subtitle>
          <template v-slot:append>
            <v-list-item-action>
              <DialogUsersEditPhoneNumber
                :value="cUser?.phoneNumber"
                @update:value="savePhoneNumber"
              />
            </v-list-item-action>
          </template>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-card-account-details-outline</v-icon>
          </template>
          <v-list-item-title>사용자 권한</v-list-item-title>
          <v-list-item-subtitle>{{ userRole }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-calendar-month</v-icon>
          </template>
          <v-list-item-title>가입일</v-list-item-title>
          <v-list-item-subtitle>{{ createdAt }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-account-edit</v-icon>
          </template>
          <v-list-item-title>수정일</v-list-item-title>
          <v-list-item-subtitle>{{ updatedAt }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-timer-outline</v-icon>
          </template>
          <v-list-item-title>마지막 로그인</v-list-item-title>
          <v-list-item-subtitle>{{ lastLogin }}</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <template v-slot:prepend>
            <v-icon>mdi-circle-multiple-outline</v-icon>
          </template>
          <v-list-item-title>포인트</v-list-item-title>
          <v-list-item-subtitle>{{ cUser?.point?.point }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
      <v-divider class="mt-4" />
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn color="error" size="large" variant="flat" @click="logout">
        로그아웃
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
