import type { FindAllPointHistoryListQuery } from '#gql';

export const usePointHistoryStore = defineStore('pointHistoryStore', () => {
  const GqlInstance = useGql();
  type FindAllPointHistoryListQueryType =
    FindAllPointHistoryListQuery['findPointHistoryList'];
  type PointHistorySearchInput = {
    page: number;
    size: number;
    keyword: string;
  };
  // ============= STATE =============
  const page = ref(1);
  const size = ref(10);
  const totalCount = ref(0);
  const pointHistoryList = ref<FindAllPointHistoryListQueryType['list']>();
  const state = { page, size, totalCount, pointHistoryList };

  // ============= ACTIONS =============
  const findAllPointHistoryList = async (input: PointHistorySearchInput) => {
    try {
      const data = await GqlInstance('FindAllPointHistoryList', { input });
      if (
        data.findPointHistoryList?.success &&
        data.findPointHistoryList?.list
      ) {
        totalCount.value = data.findPointHistoryList.totalCount;
        pointHistoryList.value = data.findPointHistoryList.list;
      }
    } catch (e) {
      console.error(e);
    }
  };
  const actions = { findAllPointHistoryList };

  return {
    ...state,
    ...actions,
  };
});
