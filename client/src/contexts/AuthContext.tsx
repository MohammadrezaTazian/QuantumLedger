import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authApi, tokenStorage, AuthResponse } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: number;
  phone: string;
  firstName?: string;
  lastName?: string;
  educationLevel?: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (phone: string, code: string) => Promise<void>;
  sendCode: (phone: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = tokenStorage.getAccessToken();
      if (accessToken) {
        try {
          const userData = await authApi.getProfile();
          setUser(userData);
        } catch (error) {
          tokenStorage.clearTokens();
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const sendCode = async (phone: string) => {
    try {
      await authApi.sendCode(phone);
      toast({
        title: "Success",
        description: "Verification code sent successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send verification code",
        variant: "destructive",
      });
      throw error;
    }
  };

  const login = async (phone: string, code: string) => {
    try {
      const response: AuthResponse = await authApi.verifyCode(phone, code);
      tokenStorage.setTokens(response.accessToken, response.refreshToken);
      setUser(response.user);
      toast({
        title: "Success",
        description: "Login successful",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid verification code",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    tokenStorage.clearTokens();
    localStorage.removeItem("selectedLevel");
    setUser(null);
  };

  const updateProfile = async (data: any) => {
    try {
      const updatedUser = await authApi.updateProfile(data);
      setUser(updatedUser);
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        sendCode,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
