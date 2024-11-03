import type { Token } from '~/store/auth';

export default () => {
  const accessTokenName = 'user-access-hub-access-token';
  const refreshTokenName = 'user-access-hub-refresh-token';
  return {
    // accessTokenName,
    // refreshTokenName,
    // 토큰 셋팅
    setToken: (token: Token) => {
      useCookie(accessTokenName).value = token.access_token;
      useCookie(refreshTokenName).value = token.refresh_token;
    },
    // 토큰 가져오기
    getToken: () => {
      return {
        access_token: useCookie(accessTokenName).value,
        refresh_token: useCookie(refreshTokenName).value,
      };
    },
    // 토큰 존재 여부 확인
    hasToken: () => {
      return !!useCookie(accessTokenName).value;
    },
    // 토큰 삭제
    removeToken: () => {
      useCookie(accessTokenName).value = '';
      useCookie(refreshTokenName).value = '';
    },
  };
};
