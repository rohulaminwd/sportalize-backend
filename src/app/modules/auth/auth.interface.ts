export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
};

export type changePassword = {
  currentPass: string | undefined;
  newPass: string | undefined;
};
