export default () => {
  return {
    // 이메일
    email: [
      (v: string) => !!v || '이메일을 입력해주세요.',
      (v: string) => /.+@.+\..+/.test(v) || '이메일 형식이 올바르지 않습니다.',
    ],
    // 패스워드
    password: [(v: string) => !!v || '비밀번호를 입력해주세요.'],
    // 패스워드 확인
    passwordConfirm: (password: string) => [
      (v: string) => !!v || '비밀번호 확인을 입력해주세요.',
      (v: string) => v === password || '비밀번호가 일치하지 않습니다.',
    ],
  };
};
