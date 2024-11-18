<script setup lang="ts">
import { useUserStore } from '~/store/user';
import dayjs from 'dayjs';

const userStore = useUserStore();
const pageSize = ref(10);
const pageIndex = ref(0);
const keyword = ref('');

const cUsers = computed(() => userStore.users);
const headers = ref([
  { title: '회원타입', key: 'type' },
  { title: '이메일', key: 'email' },
  { title: '이름', key: 'name' },
  { title: '휴대폰번호', key: 'phoneNumber' },
  { title: '권한', key: 'role' },
  { title: '생성일', key: 'createdAt' },
  { title: '수정일', key: 'updatedAt' },
  { title: '마지막 로그인일', key: 'lastLoginAt' },
]);

const onPageClick = (page: number) => {
  pageIndex.value = page;
  userStore.findAllUsers({
    pageSize: pageSize.value,
    pageIndex: pageIndex.value,
    keyword: keyword.value,
  });
};

onMounted(async () => {
  await userStore.findAllUsers({
    pageSize: pageSize.value,
    pageIndex: pageIndex.value,
    keyword: keyword.value,
  });
});
</script>
<template>
  <h1>회원관리</h1>
  <v-card flat>
    <v-card-title>회원목록</v-card-title>
    <v-card-text>
      <v-data-table :headers="headers" :items="cUsers" hide-default-footer>
        <!-- 권한 맵핑 -->
        <template #item.role="{ item }">
          <v-chip v-if="item.role === 'ADMIN'" color="primary" label>
            관리자
          </v-chip>
          <v-chip v-else-if="item.role === 'USER'" color="secondary" label>
            일반회원
          </v-chip>
          <v-chip v-else color="error" label>-</v-chip>
        </template>
        <!-- 생성일 포맷 -->
        <template #item.createdAt="{ item }">
          {{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <!-- 수정일 포맷 -->
        <template #item.updatedAt="{ item }">
          {{ dayjs(item.updatedAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <!-- 마지막 로그인일 포맷 -->
        <template #item.lastLoginAt="{ item }">
          {{ dayjs(item.lastLoginAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </v-data-table>
      <v-pagination
        v-model="pageIndex"
        :length="cUsers?.totalCount"
        @click="onPageClick(pageIndex)"
      />
    </v-card-text>
  </v-card>
</template>
