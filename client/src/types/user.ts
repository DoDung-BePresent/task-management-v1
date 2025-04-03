export type User = {
  _id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  isActive: boolean;
  lastLogin: Date | null;
  currentWorkspace: string | null;
};

export type LoginResponse = {
  message: string;
  data?: {
    user: User;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
};

export type RegisterResponse = {
  message: string;
};

export type GetCurrentUserResponse = {
  message: string;
  data?: User;
};

export type RegisterPayload = Pick<User, "name" | "email"> & {
  password: string;
};

export type LoginPayload = Pick<User, "email"> & {
  password: string;
};
