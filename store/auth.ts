import type { SignUpInput } from '#gql/default';

export const useAuthStore = defineStore('signup', () => {
  const GqlInstance = useGql();
  const { useAlert, useConfirm } = useDialog();
  // ============= STATE =============
  const state = {};

  // ============= ACTIONS =============
  // 회원가입
  const signup = async (input: SignUpInput) => {
    const confirm = await useConfirm({
      title: '회원가입을 진행하시겠습니까?',
      type: 'info',
    });
    if (!confirm) return;

    const data = await GqlInstance('SignUp', { input });
    if (data.signUp?.success) {
      useAlert({
        title: '회원가입이 완료되었습니다.',
        type: 'success',
        message: '가입하신 이메일로 로그인해주세요.',
      });
      return true;
    } else {
      useAlert({
        title: '회원가입에 실패했습니다.',
        type: 'error',
        message: data.signUp?.message,
      });
      return false;
    }
  };

  // 이메일 로그인
  const signinForEmail = async (email: string, password: string) => {
    try {
      const data = await GqlInstance('EmailSignIn', { email, password });
      if (!data.emailSignIn?.success) {
        useAlert({
          title: '로그인에 실패했습니다.',
          type: 'error',
          message: data.emailSignIn?.message,
        });
        return false;
      }
      console.log('data : ', data);
      if (data.emailSignIn?.success && data.emailSignIn.token) {
        localStorage.setItem(
          'accessToken',
          data.emailSignIn?.token?.accessToken
        );
        localStorage.setItem(
          'refreshToken',
          data.emailSignIn?.token?.refreshToken
        );
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 구글 로그인 URL 조회
  const getSigninUrlForGoogle = async () => {
    try {
      const { data } = await useFetch('/api/auth/signin/google');
      return data.value;
    } catch (e) {
      console.error(e);
    }
  };
  // 구글 로그인 인증
  const signinForGoogle = async (code: string) => {
    try {
      const { data, error } = await useFetch<{
        accessToken: string;
        refreshToken: string;
      }>('/api/auth/callback/google', {
        query: { code },
      });
      if (error.value) {
        throw '회원가입 실패';
      }
      if (data.value) {
        localStorage.setItem('accessToken', data.value.accessToken);
        localStorage.setItem('refreshToken', data.value.refreshToken);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  const actions = {
    signup,
    signinForEmail,
    getSigninUrlForGoogle,
    signinForGoogle,
  };
  return {
    ...state,
    ...actions,
  };
});
