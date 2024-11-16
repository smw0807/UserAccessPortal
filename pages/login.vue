<script setup lang="ts">
import type { SignUpInput } from '#gql/default';
import { useAuthStore } from '~/store/auth';
import { useRouter } from 'vue-router';

definePageMeta({
  layout: 'login',
  title: '로그인',
  description: '로그인 페이지입니다.',
});

const showSignUp = ref(false);

const email = ref('');
const password = ref('');

const store = useAuthStore();
// 회원가입
const signup = async (data: SignUpInput) => {
  const result = await store.signup(data);
  if (result) {
    showSignUp.value = false;
  }
};
const form = ref();
// 이메일 로그인
const router = useRouter();
const emailLogin = async () => {
  const { valid } = await form.value.validate();
  if (!valid) return;
  const result = await store.signinForEmail(email.value, password.value);
  if (result) {
    router.push('/');
  }
};
// 지메일 로그인
const googleLogin = async () => {
  const url = await store.getSigninUrlForGoogle();
  if (url) {
    window.location.href = url as string;
  }
};
// 카카오 로그인
const kakaoLogin = async () => {
  const url = await store.getSigninUrlForKakao();
  if (url) {
    window.location.href = url as string;
  }
};
</script>
<template>
  <v-sheet
    border="md"
    class="pa-6 text-white mx-auto"
    color="#141518"
    width="60%"
  >
    <h4 class="text-h5 font-weight-bold mb-4">로그인</h4>
    <v-form ref="form">
      <v-text-field
        v-model="email"
        class="mb-4"
        color="red-accent-2"
        label="이메일"
        outlined
        :rules="[(v) => !!v || '이메일을 입력해주세요.']"
      />
      <v-text-field
        v-model="password"
        class="mb-4"
        color="red-accent-2"
        label="비밀번호"
        outlined
        type="password"
        :rules="[(v) => !!v || '비밀번호를 입력해주세요.']"
        @keyup.enter="emailLogin"
      />

      <v-btn
        class="text-none text-black mb-4"
        color="green-lighten-4"
        size="x-large"
        variant="flat"
        prepend-icon="mdi-email-minus-outline"
        block
        @click="emailLogin"
      >
        이메일 로그인
      </v-btn>
      <v-btn
        class="text-none text-black mb-4"
        color="grey-lighten-5"
        size="x-large"
        variant="flat"
        block
        @click="googleLogin"
      >
        <img src="/google.svg" />
        지메일 로그인
      </v-btn>
      <v-btn
        class="text-none text-black mb-4"
        color="yellow-accent-2"
        size="x-large"
        variant="flat"
        block
        @click="kakaoLogin"
      >
        <img src="/kakaotalk.svg" />
        카카오 로그인
      </v-btn>
      <v-btn
        class="text-none text-black"
        color="blue-accent-2"
        size="x-large"
        variant="outlined"
        block
        @click="showSignUp = true"
      >
        회원가입
      </v-btn>
    </v-form>
    <Dialog-SignUp v-model="showSignUp" @signup="signup" />
  </v-sheet>
</template>
<style scoped>
img {
  width: 8%;
  height: 8%;
}
</style>
