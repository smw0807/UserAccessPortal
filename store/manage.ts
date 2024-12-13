export const useManageStore = defineStore('manageStore', () => {
  const { useAlert, useConfirm } = useDialog();
  const GqlInstance = useGql();

  // ============= STATE =============
  const state = {};

  // ============= ACTIONS =============
  // 회원 휴대폰 번호 수정
  const savePhoneNumber = async (phoneNumber: string, email: string) => {
    try {
      const confirm = await useConfirm({
        type: 'info',
        title: '휴대폰 번호 수정',
        message: '휴대폰 번호를 수정하시겠습니까?',
      });
      if (!confirm) {
        return;
      }
      const data = await GqlInstance('SavePhoneNumber', { phoneNumber, email });
      if (data.savePhoneNumber) {
        if (data.savePhoneNumber.success) {
          useAlert({
            title: '휴대폰 번호 수정',
            type: 'success',
            message: data.savePhoneNumber.message,
          });
          return true;
        } else {
          useAlert({
            title: '휴대폰 번호 수정',
            type: 'error',
            message: data.savePhoneNumber.message,
          });
          return false;
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // 회원 권한 수정

  // 회원 상태 수정
  const actions = { savePhoneNumber };

  return {
    ...state,
    ...actions,
  };
});
