<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: boolean;
  }>(),
  {
    modelValue: false,
  }
);
const open = computed(() => props.modelValue);
const emit = defineEmits(['signup', 'update:modelValue']);

const form = ref();
const rules = useRules();
const email = ref('');
const name = ref('');
const password = ref('');
const passwordConfirm = ref('');

const signup = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;

  emit('signup', {
    email: email.value,
    name: name.value,
    password: password.value,
  });
};
// 닫히면 초기화
watch(open, (value) => {
  if (!value) {
    email.value = '';
    name.value = '';
    password.value = '';
    passwordConfirm.value = '';
  }
});
</script>
<template>
  <v-dialog v-model="open" persistent width="60%">
    <v-sheet>
      <v-card class="pa-5">
        <h4 class="text-h5 font-weight-bold mb-4">회원가입</h4>
        <v-form ref="form">
          <v-text-field
            v-model="email"
            class="mb-4"
            color="red-accent-2"
            label="이메일"
            outlined
            :rules="rules.email"
          />
          <v-text-field
            v-model="name"
            class="mb-4"
            color="red-accent-2"
            :rules="rules.text"
            label="이름"
            outlined
          />
          <v-text-field
            v-model="password"
            class="mb-4"
            color="red-accent-2"
            label="비밀번호"
            outlined
            type="password"
            :rules="rules.password"
          />
          <v-text-field
            v-model="passwordConfirm"
            class="mb-4"
            color="red-accent-2"
            label="비밀번호 확인"
            outlined
            type="password"
            :rules="rules.passwordConfirm(password)"
          />

          <v-btn
            class="text-none text-black mb-4"
            color="green-lighten-4"
            size="x-large"
            variant="flat"
            prepend-icon="mdi-email-plus-outline"
            block
            @click="signup"
          >
            회원가입
          </v-btn>
          <v-btn
            class="text-none text-black mb-4"
            color="grey-lighten-5"
            size="x-large"
            variant="flat"
            block
            @click="$emit('update:modelValue', false)"
          >
            취소
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
  </v-dialog>
</template>
