<script setup lang="ts">
import { useAuthStore } from '~/store/auth';

definePageMeta({
  layout: 'login',
});
const authStore = useAuthStore();
const route = useRoute();

const code = route.query.code;
const state = route.query.state;

const isProcessing: Ref<boolean> = ref(true);
const isError: Ref<boolean> = ref(false);

const iconName: Ref<string> = ref('mdi-check-circle');
const iconColor: Ref<string> = ref('success');

const titleText: Ref<string> = ref('로그인 인증 중입니다.');
const bodyText: Ref<string> = ref(
  '인증이 완료되면 메인 페이지로 이동합니다.<br />잠시만 기다려주세요!'
);

// 토큰 정보 요청
const requestToken = async () => {
  try {
    if (state === 'kakao') {
      await authStore.signinForKakao(code as string);
    } else {
      await authStore.signinForGoogle(code as string);
    }
    changeText('success');
    setTimeout(() => router.push('/'), 3000);
  } catch (e) {
    isError.value = true;
    changeIcon();
    changeText('error', e as string);
  }
  isProcessing.value = false;
};
requestToken();

// 화면 문구 변경
const changeText = (type: 'success' | 'error', message?: string) => {
  if (message) {
    titleText.value = '로그인에 실패했습니다.';
    bodyText.value = message;
  } else {
    if (type === 'success') {
      titleText.value = '로그인 인증 완료.';
      bodyText.value =
        '잠시후 메인화면으로 이동합니다.<br />잠시만 기다려주세요!';
    } else if (type === 'error') {
      titleText.value = '로그인에 실패했습니다.';
      bodyText.value =
        '다시 로그인을 시도해주세요.<br />아래 버튼을 클릭하면 다시 로그인 페이지로 이동합니다.';
    }
  }
};
// 화면 아이콘 변경
const changeIcon = () => {
  iconName.value = 'mdi-close-circle';
  iconColor.value = 'error';
};

// 로그인 페이지로 이동
const router = useRouter();
const login = () => {
  router.replace('/login');
};
</script>
<template>
  <v-sheet
    class="pa-4 text-center mx-auto"
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
  >
    <v-progress-circular
      v-if="isProcessing"
      :size="100"
      color="primary"
      class="mb-5"
      indeterminate
    ></v-progress-circular>
    <v-icon
      v-else
      class="mb-5"
      :color="iconColor"
      :icon="iconName"
      size="112"
    ></v-icon>

    <h2 class="text-h5 mb-3">{{ titleText }}</h2>
    <p class="mb-4 text-medium-emphasis text-body-2">
      <span v-html="bodyText"></span>
    </p>

    <!-- 인증 실패 시 다시 로그인 하도록 버튼 활성화 -->
    <div class="text-end" v-if="isError">
      <v-divider class="mb-4"></v-divider>
      <v-btn
        class="text-none"
        color="indigo-darken-1"
        variant="flat"
        @click="login"
      >
        다시 로그인하기
      </v-btn>
    </div>
  </v-sheet>
</template>
