export const useUserStore = defineStore('user', () => {
  const GqlInstance = useGql();
  // ============= STATE =============
  const userInfo = ref();
  const state = { userInfo };

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

  // 사용자 정보 가져오기
  const getUserInfo = async () => {
    try {
      const data = await GqlInstance('FindUserByEmail', {});
      if (data.findUserByEmail?.success) {
        userInfo.value = data.findUserByEmail?.user;
      }
    } catch (e) {
      console.error(e);
    }
  };
  const actions = {
    checkAdminUser,
    getUserInfo,
  };

  return {
    ...state,
    ...actions,
  };
});
