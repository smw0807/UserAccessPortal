import { defineNuxtRouteMiddleware } from 'nuxt/app';
import { useAuthStore } from '~/store/auth';
/**
 * 공식문서 URL : https://nuxt.com/docs/guide/directory-structure/middleware#setting-middleware-at-build-time
 * 라우트 이동 시 토큰 검증
 * 토큰 검증 실패 시 로그인 페이지로 이동
 * 검증 후 권한에 맞지 않는 경우 메인 페이지로 이동??
 *
 * 토큰 검증 제외 페이지
 * /login, /auth
 *
 * return navigateTo('/')- 지정된 경로로 리디렉션하고 리디렉션이 서버 측에서 발생하는 경우 리디렉션 코드를 Found 로 설정합니다.302
 * return navigateTo('/', { redirectCode: 301 })- 지정된 경로로 리디렉션하고 리디렉션이 서버 측에서 발생하는 경우 리디렉션 코드를 영구적으로 이동 으로 설정합니다.301
 * return abortNavigation()- 현재 탐색을 중지합니다
 * return abortNavigation(error)- 오류로 인해 현재 탐색을 거부합니다.
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const { getToken } = useAuth();
  const toUrl = to.path;

  //  로그인 및 인증 페이지는 토큰 검증 제외
  if (toUrl === '/login' || toUrl === '/auth') {
    return;
  }

  // 토큰 검증
  const { access_token, refresh_token } = getToken();
  // 토큰이 없을 경우 로그인 페이지로 이동
  if (!access_token || !refresh_token) {
    useGqlToken(null);
    return navigateTo('/login');
  }
  // access_token 검증
  useGqlToken(access_token);
  const accessTokenValid = await authStore.verifyToken();
  // 루트 페이지 접근 시 관리자가 아니면 /user 페이지로 이동
  if (accessTokenValid && toUrl === '/') {
    if (accessTokenValid.user?.role !== 'ADMIN') {
      return navigateTo('/user');
    }
  }
  // access_token 검증 실패 시 refresh_token 검증 및 갱신
  if (accessTokenValid && !accessTokenValid.success) {
    useGqlToken(null);
    const refreshTokenValid = await authStore.refreshToken();
    const { access_token: newAccessToken } = getToken();
    useGqlToken(newAccessToken!);

    // 실패 시 로그인 페이지로 이동
    if (!refreshTokenValid) {
      return navigateTo('/login');
    }
  }
});
