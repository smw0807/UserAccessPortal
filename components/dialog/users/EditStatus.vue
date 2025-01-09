<script setup lang="ts">
const props = defineProps<{
  value: string;
}>();
const emit = defineEmits(['update:value']);
const open = ref(false);

const handleOpen = () => (open.value = true);
const handleClose = () => (open.value = false);

const selectedStatus = ref(props.value);

const statusItems = ref([
  { value: 'ACTIVE', label: '활성화' },
  { value: 'INACTIVE', label: '비활성화' },
]);

const updateStatus = () => {
  emit('update:value', selectedStatus.value);
  handleClose();
};
</script>
<template>
  <v-btn @click="handleOpen" variant="text">
    <v-chip v-if="value === 'ACTIVE'" color="success" variant="flat">
      활성화
    </v-chip>
    <v-chip v-else-if="value === 'INACTIVE'" color="error" variant="flat">
      비활성화
    </v-chip>
    <v-chip v-else color="error" label>-</v-chip>
  </v-btn>
  <v-dialog v-model="open" width="auto">
    <v-card class="pa-2" max-width="200" title="회원 상태 변경">
      <v-select
        v-model="selectedStatus"
        :items="statusItems"
        item-value="value"
        item-title="label"
      />
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          color="primary"
          variant="elevated"
          text="저장"
          @click="updateStatus"
        ></v-btn>
        <v-btn
          class="ms-auto"
          text="닫기"
          variant="flat"
          @click="handleClose"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
