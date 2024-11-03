import type { SignUpInput } from '#gql/default';

export type Token = {
  access_token: string;
  refresh_token: string;
};
export const useAuthStore = defineStore('signup', () => {
  const GqlInstance = useGql();
  const { useAlert, useConfirm } = useDialog();
  const { setToken } = useAuth();
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
      if (data.emailSignIn?.success && data.emailSignIn.token) {
        setToken(data.emailSignIn.token);
      }
      return true;
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
      const { data, error } = await useFetch<Token>(
        '/api/auth/callback/google',
        {
          query: { code },
        }
      );
      if (error.value) {
        throw '회원가입 실패';
      }
      if (data.value) {
        setToken(data.value);
      }
    } catch (e) {
      console.error(e);
      throw e;
    }
  };

  // 카카오 로그인 URL 조회
  const getSigninUrlForKakao = async () => {
    try {
      const { data } = await useFetch('/api/auth/signin/kakao');
      console.log('data : ', data);
      return data.value;
    } catch (e) {
      console.error(e);
    }
  };
  // 카카오 로그인 인증
  const signinForKakao = async (code: string) => {
    try {
      const { data, error } = await useFetch<Token>(
        '/api/auth/callback/kakao',
        {
          query: { code },
        }
      );
      if (error.value) {
        throw '회원가입 실패';
      }
      if (data.value) {
        setToken(data.value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const actions = {
    signup,
    signinForEmail,
    getSigninUrlForGoogle,
    signinForGoogle,
    getSigninUrlForKakao,
    signinForKakao,
  };
  return {
    ...state,
    ...actions,
  };
});
