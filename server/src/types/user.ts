export type User = {
  _id: string;
  name: string;
  email: string;
  profilePicture: string | null;
  isActive: boolean;
  lastLogin: Date | null;
  createdAt: Date;
  updatedAt: Date;
  currentWorkspace: string | null;
};

export type RegisterPayload = Pick<User, "name" | "email"> & {
  password: string;
};

export type LoginPayload = Pick<User, "email"> & {
  password: string;
};