import type { UseFetchOptions } from '#app';

export default (url: string, options?: UseFetchOptions<any>) => {
  return useFetch(url, {
    ...options,
    onRequest({ request, options }) {
      // console.log('request : ', request);
      // console.log('options : ', options);
    },
    onRequestError({ request, options }) {
      // console.log('request error : ', request);
      // console.log('options error : ', options);
    },
    onResponse({ response }) {
      // console.log('response : ', response);
    },
    onResponseError({ response }) {
      // console.log('response error : ', response);
    },
  });
};
