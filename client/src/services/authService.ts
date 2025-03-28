import { instance } from "@/lib/axios";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/types/user";

export const authService = {
  async register(data: RegisterPayload) {
    return instance.post<AuthResponse>("/auth/register", data);
  },

  async login(data: LoginPayload) {
    return instance.post<AuthResponse>("/auth/login", data);
  },

  async logout(refreshToken: string) {
    return instance.post("/auth/logout", { refreshToken });
  },

  async refreshToken(refreshToken: string) {
    return instance.post("/auth/refresh-token", { refreshToken });
  },

  async getCurrentUser() {
    return instance.get("/user/current-user");
  },
};
