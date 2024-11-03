import type { Token } from '~/store/auth';

export default function useAuth() {
  const accessTokenName = 'user-access-hub-access-token';
  const refreshTokenName = 'user-access-hub-refresh-token';
  const cookie = useCookie(accessTokenName);
  const refreshCookie = useCookie(refreshTokenName);

  return {
    setToken: (token: Token) => {
      if (process.client) {
        cookie.value = token.access_token;
        refreshCookie.value = token.refresh_token;
      }
    },
    getToken: () => {
      return {
        access_token: cookie.value,
        refresh_token: refreshCookie.value,
      };
    },
    hasToken: () => {
      return !!cookie.value;
    },
    removeToken: () => {
      if (process.client) {
        cookie.value = '';
        refreshCookie.value = '';
      }
    },
  };
}
