import type { SignUpInput } from '#gql/default';

export type Token = {
  access_token: string;
  refresh_token: string;
};
export const useAuthStore = defineStore('signup', () => {
  const GqlInstance = useGql();
  const { useAlert, useConfirm } = useDialog();
  const { setToken, removeToken } = useAuth();
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
      const { data, error } = await useFetchAPI('/api/auth/login', {
        method: 'POST',
        body: {
          email,
          password,
        },
      });
      if (error.value) {
        useAlert({
          title: '로그인에 실패했습니다.',
          type: 'error',
          message: error.value.data.message,
        });
        return false;
      }
      const { token } = data.value;
      setToken(token);
      return true;
    } catch (e) {
      console.error(e);
    }
  };

  // 구글 로그인 URL 조회
  const getSigninUrlForGoogle = async () => {
    try {
      const { data } = await useFetchAPI('/api/auth/google/signin');
      if (data.value.success) {
        return data.value.url;
      }
      return null;
    } catch (e) {
      console.error(e);
    }
  };
  // 구글 로그인 인증
  const signinForGoogle = async (code: string) => {
    try {
      const { data, error } = await useFetchAPI('/api/auth/google/callback', {
        query: { code },
      });
      if (error.value) {
        throw error.value.data;
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
      const { data } = await useFetchAPI('/api/auth/kakao/signin');
      if (data.value.success) {
        return data.value.url;
      }
      return null;
    } catch (e) {
      console.error(e);
    }
  };
  // 카카오 로그인 인증
  const signinForKakao = async (code: string) => {
    try {
      const { data, error } = await useFetchAPI('/api/auth/kakao/callback', {
        query: { code },
      });
      if (error.value) {
        throw error.value.data;
      }
      if (data.value) {
        setToken(data.value);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 토큰 검증
  const verifyToken = async () => {
    try {
      const data = await GqlInstance('VerifyToken', {});
      return data.verifyToken;
    } catch (e) {
      console.error(e);
    }
  };

  // 토큰 갱신
  const refreshToken = async () => {
    const { getToken } = useAuth();
    const { access_token, refresh_token } = getToken();
    if (!access_token || !refresh_token) return false;
    useGqlToken(null);
    const data = await GqlInstance('RefreshToken', {
      token: { access_token, refresh_token },
    });
    if (data.refreshToken?.success && data.refreshToken.token) {
      setToken(data.refreshToken.token);
      useGqlToken(data.refreshToken.token.access_token);
      return true;
    }
    return false;
  };

  // 로그아웃
  const logout = async () => {
    removeToken();
    useGqlToken(null);
    const router = useRouter();
    router.push('/login');
  };

  const actions = {
    signup,
    signinForEmail,
    getSigninUrlForGoogle,
    signinForGoogle,
    getSigninUrlForKakao,
    signinForKakao,
    verifyToken,
    refreshToken,
    logout,
  };
  return {
    ...state,
    ...actions,
  };
});
