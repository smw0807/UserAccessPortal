<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
  value: string;
}>();
const emit = defineEmits(['update:modelValue', 'update:value', 'changeStatus']);

const selectedStatus = ref(props.value);
const cSelectedStatus = computed({
  get: () => props.value,
  set: (value) => {
    console.log('set : ', value);
    emit('update:value', value);
    return value;
  },
});

const statusItems = ref([
  { value: 'ACTIVE', label: '활성화' },
  { value: 'INACTIVE', label: '비활성화' },
]);

const updateStatus = () => {
  emit('changeStatus', selectedStatus.value);
  emit('update:modelValue', false);
};

watch(selectedStatus, (value) => {
  console.log(value);
});
</script>
<template>
  <v-dialog v-model="props.modelValue" width="auto">
    <v-card class="pa-2" max-width="200" title="회원 상태 변경">
      <v-select
        v-model="selectedStatus"
        :items="statusItems"
        item-value="value"
        item-title="label"
      />
      {{ selectedStatus }}
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
