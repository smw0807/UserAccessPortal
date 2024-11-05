import type { Token } from '~/store/auth';

export default function useAuth() {
  const config = useRuntimeConfig();
  const cookie = useCookie(config.public.ACCESS_TOKEN_NAME);
  const refreshCookie = useCookie(config.public.REFRESH_TOKEN_NAME);

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
