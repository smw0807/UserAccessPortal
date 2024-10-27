import { defineStore } from 'pinia';

export const useWebsiteStore = defineStore('websiteStore', () => {
  //GraphQL Test Query
  const GqlInstance = useGql();
  const hello = async () => {
    const data = await GqlInstance('HelloTest', {});
    console.log(data);
  };

  return {
    hello,
  };
});
