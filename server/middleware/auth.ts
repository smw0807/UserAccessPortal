import { useAuthStore } from '~/store/auth';
export default defineEventHandler(async (event) => {
  // const url = event.node.req.url;
  // if (!url) return;
  // // 토큰 검증 제외 경로
  // const excludePath = ['/api/login', '/api/auth/'];
  // if (excludePath?.includes(url)) return;
  // const config = useRuntimeConfig();
  // const token = getCookie(event, config.public.ACCESS_TOKEN_NAME);
  // // 토큰이 없을 경우 로그인 페이지로 이동
  // if (!token) {
  //   return sendRedirect(event, '/login');
  // }
});
