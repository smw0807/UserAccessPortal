<script setup lang="ts">
const props = defineProps<{
  value: string;
}>();
const emit = defineEmits(['update:value']);

const dialog = ref(false);
const showDialog = () => (dialog.value = true);
const hideDialog = () => (dialog.value = false);

const { phoneNumber: phoneNumberRules } = useRules();
const phoneNumber = ref(props.value ?? '');
const form = ref();

const { useConfirm } = useDialog();
const confirm = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    const confirm = await useConfirm({
      type: 'info',
      title: '휴대폰 번호 수정',
      message: '휴대폰 번호를 수정하시겠습니까?',
    });
    if (!confirm) {
      return;
    }
    emit('update:value', phoneNumber.value);
    phoneNumber.value = '';
    hideDialog();
  }
};
</script>
<template>
  <v-btn icon="mdi-pencil" variant="text" size="small" @click="showDialog" />
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card prepend-icon="mdi-cellphone" title="휴대폰 번호 수정">
      <v-card-text>
        <v-form ref="form">
          <v-text-field
            v-model="phoneNumber"
            label="휴대폰 번호"
            placeholder="- 없이 숫자만 입력해주세요."
            :rules="phoneNumberRules"
            maxlength="11"
          />
        </v-form>
      </v-card-text>
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="hideDialog"> 취소 </v-btn>

        <v-btn color="primary" variant="elevated" @click="confirm">
          확인
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
