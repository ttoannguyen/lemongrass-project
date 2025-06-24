import { authService } from "@/services/auth.service";
import type { Account } from "@/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | null;
  account: Account | null;
  isLoadingAuth: boolean;
  login: (token: string, account: Account) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("authToken")
  );
  const [account, setAccount] = useState<Account | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setIsLoadingAuth(false);
        return;
      }

      const { valid, account } = await authService.introspect();
      if (valid && account) {
        setAccount(account);
        setIsLoggedIn(true);
      } else {
        logout();
      }
      setIsLoadingAuth(false);
    };
    verifyToken();
  }, [token]);

  const login = (token: string, account: Account) => {
    setToken(token);
    setAccount(account);
    setIsLoggedIn(true);
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setToken(null);
    setAccount(null);
    setIsLoggedIn(false);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, token, account, isLoadingAuth, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
