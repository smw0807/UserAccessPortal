import type { FindAllUsersQuery, UserSearchInput } from '#gql';

export const useUserStore = defineStore('user', () => {
  const { useAlert, useConfirm } = useDialog();
  const GqlInstance = useGql();
  type FindAllUsersQueryType = FindAllUsersQuery['findAllUsers'];
  // ============= STATE =============
  const userInfo = ref();
  const users = ref<FindAllUsersQueryType['users']>();
  const state = { userInfo, users };

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

  // 회원 상세 정보 조회
  const findUserByEmail = async (email: string) => {
    try {
      const data = await GqlInstance('FindUserByEmail', { email });
      if (data.findUserByEmail?.success && data.findUserByEmail?.user) {
        return data.findUserByEmail.user;
      }
      return null;
    } catch (e) {
      console.error(e);
    }
  };

  // 회원 목록 조회
  const findAllUsers = async (filter: UserSearchInput) => {
    try {
      const data = await GqlInstance('FindAllUsers', { filter });
      if (data.findAllUsers?.success && data.findAllUsers?.users) {
        users.value = data.findAllUsers.users;
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
      const data = await GqlInstance('SavePhoneNumber', {
        phoneNumber,
      });
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
    checkAdminUser,
    findAllUsers,
    findUserByEmail,
    getUserInfo,
    savePhoneNumber,
    updateUserStatus,
    updateUserRole,
  };

  return {
    ...state,
    ...actions,
  };
});
