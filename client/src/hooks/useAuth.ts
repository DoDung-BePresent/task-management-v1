import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import type { LoginPayload, RegisterPayload } from "@/types/user";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const hasToken = localStorage.getItem("accessToken") !== null;

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      try {
        const response = await authService.getCurrentUser();
        return response.data.data;
      } catch (error) {
        return null;
      }
    },
    enabled: hasToken,
  });

  const loginMutation = useMutation({
    mutationFn: (data: LoginPayload) => authService.login(data),
    onSuccess: (response) => {
      const { tokens, user } = response.data.data!;

      // Save tokens
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);

      // Update user in cache
      queryClient.setQueryData(["auth-user"], user);

      toast.success("Logged in successfully");
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Login failed");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterPayload) => authService.register(data),
    onSuccess: () => {
      toast.success("Registration successful. Please login.");
      navigate("/sign-in");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Registration failed");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) return Promise.resolve();
      authService.logout(refreshToken);
    },
    onSuccess: () => {
      // Clear tokens
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      // Clear user from cache
      queryClient.setQueryData(["auth-user"], null);

      toast.success("Logged out successfully");
      navigate("/sign-in");
    },
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout: logoutMutation.mutate,
  };
};
