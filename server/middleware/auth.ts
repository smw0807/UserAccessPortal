export default defineEventHandler((event) => {
  const url = event.node.req.url;
  if (!url) return;
  // 토큰 검증 제외 경로
  const excludePath = ['/api/login', '/api/auth/'];
  if (excludePath?.includes(url)) return;

  const config = useRuntimeConfig();
  if ('/api'.includes(url)) {
    const token = getCookie(event, config.public.ACCESS_TOKEN_NAME);
    if (!token) {
      return sendRedirect(event, '/login');
    }
  }
});
