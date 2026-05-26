"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";

type User = {
  id: number;
  name: string;
  username: string;
  roleId?: number;
  storeId?: number;
  role?: string;
  permissions?: string[];
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH CURRENT USER
  // =========================
  const fetchMe = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      });

      // Nếu không ok (401, 403, 500, etc.) -> user chưa login hoặc token hết hạn
      if (!res.ok) {
        setUser(null);
        return;
      }

      // Parse JSON response
      try {
        const data = await res.json();
        setUser(data.data);
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setUser(null);
    }
  }, []);

  // =========================
  // INITIALIZE AUTH STATE
  // =========================
  useEffect(() => {
    const initAuth = async () => {
      await fetchMe();
      setLoading(false);
    };

    initAuth();
  }, [fetchMe]);

  // =========================
  // LOGIN
  // =========================
  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username, password }),
        });

        const data = await res.json();

        if (!res.ok) {
          return false;
        }

        setUser(data.user);
        return true;
      } catch (error) {
        console.error("Login error:", error);
        return false;
      }
    },
    [],
  );

  // =========================
  // LOGOUT
  // =========================
  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout error:", error);
    }

    setUser(null);
    router.push("/login");
  }, [router]);

  // =========================
  // REFRESH USER DATA
  // =========================
  const refreshUser = useCallback(async () => {
    await fetchMe();
  }, [fetchMe]);

  // =========================
  // SHOW LOADING STATE
  // =========================
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(UserContext);

  if (!ctx) {
    throw new Error("useAuth must be used inside UserProvider");
  }

  return ctx;
};
