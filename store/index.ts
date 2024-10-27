import { defineStore } from 'pinia';

export const useWebsiteStore = defineStore('websiteStore', () => {
  //GraphQL Test Query
  const hello = async () => {
    const { error } = await useAsyncGql({
      operation: 'HelloTest',
      variables: {},
      options: {
        transform: (data) => {
          console.log('data : ', data.helloTest);
        },
      },
    });
    if (error.value) {
      console.log('error : ', error.value);
    }
  };

  return {
    hello,
  };
});
