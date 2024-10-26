<script setup lang="ts">
definePageMeta({
  layout: 'login',
  title: '로그인',
  description: '로그인 페이지입니다.',
});

const rules = {
  email: [
    (v: string) => !!v || '이메일을 입력해주세요.',
    (v: string) => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.',
  ],
  password: [(v: string) => !!v || '비밀번호를 입력해주세요.'],
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

    <v-text-field
      class="mb-4"
      color="red-accent-2"
      label="이메일"
      outlined
      :rules="rules.email"
    />
    <v-text-field
      class="mb-4"
      color="red-accent-2"
      label="비밀번호"
      outlined
      type="password"
      :rules="rules.password"
    />

    <v-btn
      class="text-none text-black mb-4"
      color="green-lighten-4"
      size="x-large"
      variant="flat"
      prepend-icon="mdi-email-minus-outline"
      block
    >
      이메일 로그인
    </v-btn>
    <v-btn
      class="text-none text-black mb-4"
      color="grey-lighten-5"
      size="x-large"
      variant="flat"
      block
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
    >
      회원가입
    </v-btn>
  </v-sheet>
</template>
<style scoped>
img {
  width: 8%;
  height: 8%;
}
</style>
