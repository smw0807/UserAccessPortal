<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  item: any;
}>();
const emit = defineEmits(['update:modelValue', 'update:status']);

const selectedStatus = ref('');

const statusItems = ref([
  { value: 'ACTIVE', label: '활성화' },
  { value: 'INACTIVE', label: '비활성화' },
]);

const updateStatus = () => {
  emit('update:status', {
    email: props.item.email,
    status: selectedStatus.value,
  });
  emit('update:modelValue', false);
};
</script>
<template>
  <v-btn @click="emit('update:modelValue', true)" variant="text">
    <v-chip
      v-if="props.item.status === 'ACTIVE'"
      color="success"
      variant="flat"
    >
      활성화
    </v-chip>
    <v-chip
      v-else-if="props.item.status === 'INACTIVE'"
      color="error"
      variant="flat"
    >
      비활성화
    </v-chip>
    <v-chip v-else color="error" label>-</v-chip>
  </v-btn>
  <v-dialog v-model="props.modelValue" width="auto">
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
          @click="emit('update:modelValue', false)"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
