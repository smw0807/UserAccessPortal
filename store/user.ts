export const useUserStore = defineStore('user', () => {
  const GqlInstance = useGql();

  // ============= ACTIONS =============
  // 관리자 여부 체크
  const checkAdminUser = async () => {
    try {
      const data = await GqlInstance('CheckAdminUser', {});
      return data.checkAdminUser.success;
    } catch (e) {
      console.error(e);
    }
  };
  const actions = {
    checkAdminUser,
  };

  return {
    ...actions,
  };
});
