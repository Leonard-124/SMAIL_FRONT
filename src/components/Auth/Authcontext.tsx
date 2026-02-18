// import {
//   createContext,
//   useContext,
//   useEffect,
//   useState,
//   useCallback,
//   type ReactNode,
// } from "react";
// import api, { setAccessToken, clearAccessToken } from "./api";
// import useCartStore from "../../useCartStore"

// interface User {
//   id: number;
//   email: string;
//   username: string;
// }

// interface AuthContextValue {
//   user: User | null;
//   isLoading: boolean;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => Promise<void>;
//   register: (
//     username: string,
//     email: string,
//     password: string,
//     confirmPassword: string
//   ) => Promise<void>;
// }

// const AuthContext = createContext<AuthContextValue | null>(null);

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   const initCart = useCartStore((s) => s.initCart);
//   const clearCartSession = useCartStore((s) => s.clearCartSession);

//   // ─── Silent refresh on mount ───────────────────────────────────────────────
//   useEffect(() => {
//     (async () => {
//       try {
//         const { data: refreshData } = await api.post("/auth/refresh");
//         setAccessToken(refreshData.accessToken);

//         const { data: meData } = await api.get("/auth/me");
//         const loggedInUser: User = meData.user;

//         setUser(loggedInUser);
//         // Restore this user's cart from localStorage
//         initCart(String(loggedInUser.id));
//       } catch {
//         clearAccessToken();
//         setUser(null);
//       } finally {
//         setIsLoading(false);
//       }
//     })();
//   }, [initCart]);

//   const login = useCallback(
//     async (email: string, password: string) => {
//       const { data } = await api.post("/auth/login", { email, password });
//       setAccessToken(data.accessToken);
//       setUser(data.user);
//       // Load this user's saved cart from localStorage
//       initCart(String(data.user.id));
//     },
//     [initCart]
//   );

//   const logout = useCallback(async () => {
//     try {
//       await api.post("/auth/logout");
//     } finally {
//       clearAccessToken();
//       // Persist cart to localStorage first, then wipe from memory
//       clearCartSession();
//       setUser(null);
//     }
//   }, [clearCartSession]);

//   const register = useCallback(
//     async (
//       username: string,
//       email: string,
//       password: string,
//       confirmPassword: string
//     ) => {
//       await api.post("/auth/register", {
//         username,
//         email,
//         password,
//         confirmPassword,
//       });
//     },
//     []
//   );

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isLoading,
//         isAuthenticated: !!user,
//         login,
//         logout,
//         register,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth(): AuthContextValue {
//   const ctx = useContext(AuthContext);
//   if (!ctx) throw new Error("useAuth must be used within AuthProvider");
//   return ctx;
// }
////////////////////////////////////////////////////////////////////////////////////////

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import api, { setAccessToken, clearAccessToken } from "./api";
import useCartStore from "../../useCartStore";

interface User {
  id: number;
  email: string;
  username: string;
}

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, email: string, password: string, confirmPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const initCart = useCartStore((s) => s.initCart);
  const clearCartSession = useCartStore((s) => s.clearCartSession);

  // Silent refresh on mount — restores session from httpOnly cookie
  useEffect(() => {
    (async () => {
      try {
        const { data: refreshData } = await api.post("/auth/refresh");
        setAccessToken(refreshData.accessToken);
        const { data: meData } = await api.get("/auth/me");
        setUser(meData.user);
        initCart(String(meData.user.id));
      } catch (err: unknown) {
        // ✅ FIX: log unexpected errors (not normal 401 on first visit)
        const status = (err as { response?: { status?: number } })?.response?.status;
        if (status !== 401 && status !== 403) {
          console.warn("Silent refresh failed:", err);
        }
        clearAccessToken();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [initCart]);

  const login = useCallback(
    async (email: string, password: string) => {
      const { data } = await api.post("/auth/login", { email, password });
      setAccessToken(data.accessToken);
      setUser(data.user);
      initCart(String(data.user.id));
    },
    [initCart]
  );

  const logout = useCallback(async () => {
    try {
      await api.post("/auth/logout");
    } catch {
      // Proceed even if server-side logout fails
    } finally {
      clearAccessToken();
      clearCartSession();
      setUser(null);
    }
  }, [clearCartSession]);

  const register = useCallback(
    async (username: string, email: string, password: string, confirmPassword: string) => {
      await api.post("/auth/register", { username, email, password, confirmPassword });
    },
    []
  );

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}