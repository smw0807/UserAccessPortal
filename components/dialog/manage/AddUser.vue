<script setup lang="ts">
export type AddUserType = {
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
  status: string;
};
import { roleItems, statusItems } from '~/constants/item';
const emit = defineEmits<{
  (e: 'addUser', user: AddUserType): void;
}>();
const open = ref(false);
const handleOpen = () => (open.value = true);
const handleClose = () => (open.value = false);

const form = ref();
const email = ref('');
const name = ref('');
const phoneNumber = ref('');
const role = ref('');
const status = ref('');

const rules = useRules();
const { useConfirm } = useDialog();
const handleAddUser = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  const confirm = await useConfirm({
    title: '회원 추가',
    type: 'warning',
    message: '회원을 추가하시겠습니까?',
    okText: '추가',
    cancelText: '취소',
  });
  if (confirm) {
    emit('addUser', {
      email: email.value,
      name: name.value,
      phoneNumber: phoneNumber.value,
      role: role.value,
      status: status.value,
    });
  }
};
</script>
<template>
  <v-btn @click="handleOpen" variant="flat" color="primary">회원추가</v-btn>
  <v-dialog v-model="open" width="500px">
    <v-card title="회원 추가">
      <v-card-text>
        <v-form ref="form">
          <v-text-field v-model="email" :rules="rules.email" label="이메일" />
          <v-text-field v-model="name" :rules="rules.text" label="이름" />
          <v-text-field
            v-model="phoneNumber"
            :rules="rules.phoneNumber"
            label="휴대폰 번호"
          />
          <v-select
            v-model="role"
            :items="roleItems"
            item-value="value"
            item-title="label"
            :rules="[(v) => !!v || '권한을 선택해주세요.']"
          />
          <v-select
            v-model="status"
            :items="statusItems"
            item-value="value"
            item-title="label"
            :rules="[(v) => !!v || '상태를 선택해주세요.']"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="handleClose" variant="flat" color="error">취소</v-btn>
        <v-btn @click="handleAddUser" variant="flat" color="primary"
          >추가</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
