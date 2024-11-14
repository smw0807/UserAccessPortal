import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
  plugins: ['~/plugins/graphql-error.ts'],
  modules: [
    (options: any, nuxt: any) => {
      nuxt.hooks.hook('vite:extendConfig', (config: any) => {
        config.plugins?.push(vuetify({ autoImport: true }));
      });
    },
    '@pinia/nuxt',
    'nuxt-graphql-client',
  ],
  runtimeConfig: {
    public: {
      GQL_HOST: import.meta.env.GQL_HOST,
      API_HOST: import.meta.env.API_HOST,
      ACCESS_TOKEN_NAME: import.meta.env.ACCESS_TOKEN_NAME,
      REFRESH_TOKEN_NAME: import.meta.env.REFRESH_TOKEN_NAME,
    },
  },
  'graphql-client': {
    tokenStorage: {
      name: 'user-access-hub-gql-token',
      mode: 'cookie',
      cookieOptions: {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
      },
    },
  },
});
