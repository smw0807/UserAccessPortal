import { useAuthStore } from '~/store/auth';

export default defineNuxtPlugin(() => {
  useGqlError(async (err) => {
    // Only log during development
    if (process.env.NODE_ENV !== 'production') {
      for (const gqlError of err.gqlErrors) {
        console.error('[nuxt-graphql-client] [GraphQL error]', {
          client: err.client,
          statusCode: err.statusCode,
          operationType: err.operationType,
          operationName: err.operationName,
          gqlError,
        });
      }
    }

    // Handle different error cases
    const tokenExpired = err.gqlErrors.some((e) => {
      return e.message.includes('id-token-expired');
    });

    const tokenRevoked = err.gqlErrors.some((e) => {
      return e.message.includes('id-token-revoked');
    });

    const unauthorized = err.gqlErrors.some((e) => {
      return (
        e.message.includes('invalid-claims') ||
        e.message.includes('insufficient-permission')
      );
    });

    if (!unauthorized) {
      console.log('Token Refresh !!!');
      const authStore = useAuthStore();
      const result = await authStore.refreshToken();
      if (!result) {
        authStore.logout();
      }
    }
  });
});
