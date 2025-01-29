import type { AddUserType } from '~/components/dialog/manage/AddUser.vue';

export const useManageStore = defineStore('manageStore', () => {
  const { useAlert, useConfirm } = useDialog();
  const GqlInstance = useGql();

  // ============= STATE =============
  const state = {};

  // ============= ACTIONS =============

  // 회원 추가
  const addUser = async (user: AddUserType) => {
    try {
      const data = await GqlInstance('AddUser', { input: user });
      if (data.addUser?.success) {
        useAlert({
          type: 'success',
          title: '회원 추가',
          message: data.addUser.message,
        });
        return true;
      }
      useAlert({
        type: 'error',
        title: '회원 추가',
        message: data.addUser?.message,
      });
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // 회원 휴대폰 번호 수정
  const savePhoneNumber = async (phoneNumber: string, email: string) => {
    try {
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

  // 회원 상태 변경
  const updateUserStatus = async (email: string, status: string) => {
    try {
      const data = await GqlInstance('UpdateUserStatus', {
        email,
        status,
      });
      if (data.updateUserStatus?.success) {
        useAlert({
          type: 'success',
          title: '회원 상태 변경',
          message: data.updateUserStatus.message,
        });
        return true;
      }
      useAlert({
        type: 'error',
        title: '회원 상태 변경',
        message: data.updateUserStatus?.message,
      });
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };

  // 회원 권한 변경
  const updateUserRole = async (email: string, role: string) => {
    try {
      const data = await GqlInstance('UpdateUserRole', {
        email,
        role,
      });
      if (data.updateUserRole?.success) {
        useAlert({
          type: 'success',
          title: '회원 권한 변경',
          message: data.updateUserRole.message,
        });
        return true;
      }
      useAlert({
        type: 'error',
        title: '회원 권한 변경',
        message: data.updateUserRole?.message,
      });
      return false;
    } catch (e) {
      console.error(e);
      return false;
    }
  };
  const actions = {
    addUser,
    savePhoneNumber,
    updateUserStatus,
    updateUserRole,
  };

  return {
    ...state,
    ...actions,
  };
});
