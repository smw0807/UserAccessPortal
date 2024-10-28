import type { SignUpInput } from '#gql/default';

export const useAuthStore = defineStore('signup', () => {
  const GqlInstance = useGql();
  const { useAlert, useConfirm } = useDialog();
  // ============= STATE =============
  const state = {};

  // ============= ACTIONS =============
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
  const actions = { signup, signinForEmail };
  return {
    ...state,
    ...actions,
  };
});
