import { apiRequest } from "./queryClient";

export interface AuthResponse {
  user: {
    id: number;
    phone: string;
    firstName?: string;
    lastName?: string;
    educationLevel?: string;
    isVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  sendCode: async (phone: string) => {
    const response = await apiRequest("POST", "/api/auth/send-code", { phone });
    return response.json();
  },

  verifyCode: async (phone: string, code: string) => {
    const response = await apiRequest("POST", "/api/auth/verify-code", { phone, code });
    return response.json() as Promise<AuthResponse>;
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiRequest("POST", "/api/auth/refresh", { refreshToken });
    return response.json();
  },

  getProfile: async () => {
    const response = await apiRequest("GET", "/api/user/profile");
    return response.json();
  },

  updateProfile: async (data: any) => {
    const response = await apiRequest("PATCH", "/api/user/profile", data);
    return response.json();
  }
};

export const tokenStorage = {
  getAccessToken: () => localStorage.getItem("accessToken"),
  getRefreshToken: () => localStorage.getItem("refreshToken"),
  setTokens: (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
  },
  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};
