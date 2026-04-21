export type DummyJsonLoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
  token: string;
  refreshToken?: string;
};

export type AuthUser = Omit<DummyJsonLoginResponse, "token" | "refreshToken">;

