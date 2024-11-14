export const useUserStore = defineStore('user', () => {
  const { useAlert, useConfirm } = useDialog();
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

  // 휴대폰 번호 수정
  const savePhoneNumber = async (phoneNumber: string) => {
    try {
      const confirm = await useConfirm({
        type: 'info',
        title: '휴대폰 번호 수정',
        message: '휴대폰 번호를 수정하시겠습니까?',
      });
      if (!confirm) {
        return;
      }
      const data = await GqlInstance('SavePhoneNumber', { phoneNumber });
      if (data.savePhoneNumber?.success) {
        useAlert({
          type: 'success',
          title: '휴대폰 번호 수정',
          message: data.savePhoneNumber.message,
        });
        await getUserInfo();
        return true;
      }
      useAlert({
        type: 'error',
        title: '휴대폰 번호 수정',
        message: data.savePhoneNumber?.message,
      });
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  const actions = {
    checkAdminUser,
    getUserInfo,
    savePhoneNumber,
  };

  return {
    ...state,
    ...actions,
  };
});
