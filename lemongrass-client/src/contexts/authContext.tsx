import { authService } from "@/services/auth.service";
import type { Account } from "@/types";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  type ReactNode,
} from "react";

export interface AuthContextType {
  token: string | null;
  account: Account | null;
  isLoggedIn: boolean;
  isLoadingAuth: boolean;
  login: (token: string, account: Account) => void;
  logout: () => void;
  reload: () => Promise<void>;

  hasRole: (roleName: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
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
      console.log("In authcontext: ", { valid, account });

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

  const reload = async () => {
    if (!token) return;

    const { valid, account } = await authService.introspect();
    if (valid && account) {
      setAccount(account);
      setIsLoggedIn(true);
    } else {
      logout();
    }
  };

  const hasRole = (roleName: string): boolean => {
    return !!account?.roles?.some((role) => role.name === roleName);
  };

  const hasAnyRole = (roleNames: string[]): boolean => {
    return !!account?.roles?.some((role) => roleNames.includes(role.name));
  };

  const flattenedPermissions = useMemo(() => {
    if (!account) return [];
    const perms = account.roles.flatMap((role) =>
      role.permissions?.map((p) => p.name)
    );
    return Array.from(new Set(perms));
  }, [account]);

  const hasPermission = (permission: string): boolean => {
    return flattenedPermissions.includes(permission);
  };

  const hasAnyPermission = (permissionsToCheck: string[]): boolean => {
    return flattenedPermissions.some((p) => permissionsToCheck.includes(p));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        account,
        isLoggedIn,
        isLoadingAuth,
        login,
        logout,
        reload,
        hasRole,
        hasAnyRole,
        hasPermission,
        hasAnyPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
