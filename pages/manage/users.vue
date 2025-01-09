<script setup lang="ts">
import { useUserStore } from '~/store/user';
import dayjs from 'dayjs';
import type { FindAllUsersQuery } from '#gql';
import { useManageStore } from '~/store/manage';

const userStore = useUserStore();
const manageStore = useManageStore();
const pageSize = ref(10);
const pageIndex = ref(1);
const keyword = ref('');

const showTable = ref(false);

// 회원 목록
const cUsers = computed(() => userStore.users);

// 테이블 헤더
const headers = ref([
  { title: '회원타입', key: 'type' },
  { title: '이메일', key: 'email' },
  { title: '이름', key: 'name' },
  { title: '휴대폰번호', key: 'phoneNumber' },
  { title: '권한', key: 'role' },
  { title: '상태', key: 'status' },
  { title: '생성일', key: 'createdAt' },
  { title: '수정일', key: 'updatedAt' },
  { title: '마지막 로그인일', key: 'lastLoginAt' },
]);

// 회원 목록 조회
const findAllUsers = async () => {
  await userStore.findAllUsers({
    pageSize: pageSize.value,
    pageIndex: pageIndex.value,
    keyword: keyword.value,
  });
};

// 페이지 클릭 이벤트
const onPageClick = (page: number) => {
  pageIndex.value = page;
  userStore.findAllUsers({
    pageSize: pageSize.value,
    pageIndex: pageIndex.value,
    keyword: keyword.value,
  });
};

// 회원 상세 정보 및 수정 다이얼로그
const dialogProfile = ref(false);
const selectUser = ref<FindAllUsersQuery['findAllUsers']['users']>();
const editUser = async (email: string) => {
  selectUser.value = await userStore.findUserByEmail(email);
  dialogProfile.value = true;
};

const savePhoneNumber = async (phoneNumber: string) => {
  const result = await manageStore.savePhoneNumber(
    phoneNumber,
    selectUser.value?.email
  );
  if (result) {
    await editUser(selectUser.value?.email);
    await findAllUsers();
  }
};

const selectedRow = ref();

// 상태 변경 컴포넌트
const dialogStatus = ref(false);
const statusHandler = (item: any) => {
  selectedRow.value = item;
  dialogStatus.value = true;
};
const updateStatus = async (email: string, status: string) => {
  const result = await userStore.updateUserStatus(email, status);
  if (result) {
    await findAllUsers();
  }
};

onMounted(() => {
  showTable.value = true;
  findAllUsers();
});
</script>
<template>
  <h1>회원관리</h1>
  <dialog-users-profile
    v-model="dialogProfile"
    :user="selectUser"
    @savePhoneNumber="savePhoneNumber"
  >
    <template #actions>
      <v-btn @click="dialogProfile = false">닫기</v-btn>
    </template>
  </dialog-users-profile>

  <v-card flat v-if="showTable">
    <v-card-text>
      <v-data-table :headers="headers" :items="cUsers" hide-default-footer>
        <!-- 상세보기 -->
        <template #item.email="{ item }">
          <div
            class="cursor-pointer text-primary"
            @click="editUser(item.email)"
          >
            {{ item.email }}
          </div>
        </template>
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
        <!-- 상태 맵핑 -->
        <template #item.status="{ item }">
          <dialog-users-edit-status
            :value="item.status"
            @update:value="updateStatus(item.email, $event)"
          />
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
