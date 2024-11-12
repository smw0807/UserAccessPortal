<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();
const emit = defineEmits(['update:modelValue', 'phoneNumber']);

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const form = ref();
const { phoneNumber: phoneNumberRules } = useRules();
const phoneNumber = ref('');

const confirm = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    emit('phoneNumber', phoneNumber.value);
  }
};
</script>
<template>
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

        <v-btn @click="dialog = false"> 취소 </v-btn>

        <v-btn color="primary" variant="elevated" @click="confirm">
          확인
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
