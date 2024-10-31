import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  build: {
    transpile: ['vuetify'],
  },
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
    },
  },
});
