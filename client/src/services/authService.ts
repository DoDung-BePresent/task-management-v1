import API from "@/lib/axios";
import type {
  LoginResponse,
  LoginPayload,
  RegisterPayload,
  RegisterResponse,
} from "@/types/user";

export const authService = {
  async register(data: RegisterPayload) {
    return API.post<RegisterResponse>("/auth/register", data);
  },

  async login(data: LoginPayload) {
    return API.post<LoginResponse>("/auth/login", data);
  },

  async logout(refreshToken: string) {
    return API.post("/auth/logout", { refreshToken });
  },

  async refreshToken(refreshToken: string) {
    return API.post("/auth/refresh-token", { refreshToken });
  },

  async getCurrentUser() {
    return API.get("/user/current-user");
  },
};
