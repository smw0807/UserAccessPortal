import type { UseFetchOptions } from '#app';

export default (url: string, options?: UseFetchOptions<any>) => {
  return useFetch(url, {
    ...options,
    onRequest({ request, options }) {
      // console.log('request : ', request);
      // console.log('options : ', options);
    },
    onResponse({ response }) {
      // console.log('response : ', response);
    },
  });
};
