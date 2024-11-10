<script setup lang="ts">
import dayjs from 'dayjs';
import { useUserStore } from '~/store/user';
definePageMeta({
  layout: 'user',
});
const store = useUserStore();
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

const logout = () => {
  console.log('logout');
};

onMounted(async () => {
  await store.getUserInfo();
});
</script>
<template>
  <v-card width="30%">
    <v-card-text>
      <v-list-item class="te">
        <template v-slot:prepend>
          <v-avatar color="primary" size="100">
            <v-img
              v-if="cUser?.profileImage"
              :src="cUser.profileImage"
              sizes="100"
            />
            <v-icon v-else>mdi-account</v-icon>
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
              <v-btn icon="mdi-pencil" variant="text" size="small" />
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
      </v-list>
    </v-card-text>
    <v-divider />
    <v-card-actions class="justify-end">
      <v-btn color="error" variant="tonal" @click="logout">로그아웃</v-btn>
    </v-card-actions>
  </v-card>
</template>
