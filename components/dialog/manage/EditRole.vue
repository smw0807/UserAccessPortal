<script setup lang="ts">
import { roleItems } from '~/constants/item';
const props = defineProps<{
  value: string;
}>();
const emit = defineEmits(['update:value']);

const open = ref(false);
const handleOpen = () => (open.value = true);
const handleClose = () => (open.value = false);

const selectedRole = ref(props.value);

const { useConfirm } = useDialog();
const updateRole = async () => {
  const confirm = await useConfirm({
    title: '권한 변경',
    type: 'warning',
    message: '권한을 변경하시겠습니까?',
    okText: '변경',
    cancelText: '취소',
  });
  if (confirm) {
    emit('update:value', selectedRole.value);
    handleClose();
  }
};
</script>
<template>
  <v-btn @click="handleOpen" variant="text">
    <v-chip v-if="value === 'ADMIN'" color="primary" label> 관리자 </v-chip>
    <v-chip v-else-if="value === 'USER'" color="secondary" label>
      사용자
    </v-chip>
    <v-chip v-else color="error" label>-</v-chip>
  </v-btn>
  <v-dialog v-model="open" width="auto">
    <v-card class="pa-2" max-width="200" title="회원 상태 변경">
      <v-select
        v-model="selectedRole"
        :items="roleItems"
        item-value="value"
        item-title="label"
      />
      <template v-slot:actions>
        <v-btn
          class="ms-auto"
          color="primary"
          variant="elevated"
          text="저장"
          @click="updateRole"
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
