<script setup lang="ts">
import dayjs from 'dayjs';
import { usePointHistoryStore } from '~/store/pointHistory';

const pointHistoryStore = usePointHistoryStore();
const showTable = ref(false);

// 적립금 내역 목록
const page = computed(() => pointHistoryStore.page);
const size = computed(() => pointHistoryStore.size);
const keyword = ref('');
const loading = ref(false);
const pointHistoryList = computed(() => pointHistoryStore.pointHistoryList);
const totalCount = computed(() => pointHistoryStore.totalCount);
const pageLength = computed(() => Math.ceil(totalCount.value / size.value));

const headers = ref([
  { title: '이메일', key: 'email' },
  { title: '총 포인트', key: 'totalPoint' },
  { title: '적립금', key: 'point' },
  { title: '사유', key: 'reason' },
  { title: '생성일', key: 'createdAt' },
]);

const findAllPointHistoryList = async () => {
  loading.value = true;
  await pointHistoryStore.findAllPointHistoryList({
    page: page.value,
    size: size.value,
    keyword: keyword.value,
  });
  loading.value = false;
};
const onPageClick = async (page: number) => {
  pointHistoryStore.page = page;
  await findAllPointHistoryList();
};
onMounted(async () => {
  showTable.value = true;
  await findAllPointHistoryList();
});
</script>
<template>
  <v-row>
    <v-col>
      <h1>적립금 내역 조회</h1>
    </v-col>
    <v-col class="d-flex justify-end">
      <v-text-field
        v-model="keyword"
        :loading="loading"
        max-width="400"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="이메일 또는 사유로 검색"
        variant="solo"
        hide-details
        single-line
        @click:append-inner="findAllPointHistoryList"
        @keyup.enter="findAllPointHistoryList"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-card flat v-if="showTable">
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="pointHistoryList"
        hide-default-footer
      >
        <template #item.createdAt="{ item }">
          {{ dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
      </v-data-table>
      <v-pagination
        v-model="pointHistoryStore.page"
        :length="pageLength"
        :total-visible="10"
        @click="onPageClick(page)"
      />
    </v-card-text>
  </v-card>
</template>
