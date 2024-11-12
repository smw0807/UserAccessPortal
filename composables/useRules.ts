export default () => {
  return {
    // 이메일
    email: [
      (v: string) => !!v || '이메일을 입력해주세요.',
      (v: string) => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.',
    ],
    // 패스워드 (최소8자리, 공백불가)
    password: [
      (v: string) => !!v || '비밀번호를 입력해주세요.',
      (v: string) => v.length >= 8 || '8자 이상 입력해주세요.',
      (v: string) => !/\s/.test(v) || '공백을 사용할 수 없습니다.',
    ],
    // 패스워드 확인
    passwordConfirm: (password: string) => [
      (v: string) => !!v || '비밀번호 확인을 입력해주세요.',
      (v: string) => v.length >= 8 || '8자 이상 입력해주세요.',
      (v: string) => !/\s/.test(v) || '공백을 사용할 수 없습니다.',
      (v: string) => v === password || '비밀번호가 일치하지 않습니다.',
    ],
    // 단순 텍스트 (필수, 공백불가, 최대 20자, 최소 2자, 특수문자 제외, 숫자 제외)
    text: [
      (v: string) => !!v || '필수 입력사항입니다.',
      (v: string) => v.length <= 20 || '20자 이내로 입력해주세요.',
      (v: string) => v.length >= 2 || '2자 이상 입력해주세요.',
      (v: string) =>
        /^[a-zA-Z가-힣\s]+$/.test(v) || '특수문자, 숫자는 사용할 수 없습니다.',
    ],
    // 휴대폰 번호 (-) 제외 숫자만 입력
    phoneNumber: [
      (v: string) => /^[0-9]+$/.test(v) || '휴대폰 번호는 숫자만 입력해주세요.',
      (v: string) => v.length === 11 || '휴대폰 번호는 11자리로 입력해주세요.',
    ],
  };
};
