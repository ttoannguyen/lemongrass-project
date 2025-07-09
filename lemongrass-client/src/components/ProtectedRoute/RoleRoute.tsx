import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";

type RoleRouteProps = {
  children: ReactNode;
  requiredRoles: string[];
};

const RoleRoute = ({ children, requiredRoles }: RoleRouteProps) => {
  const { isLoggedIn, isLoadingAuth, hasAnyRole } = useAuth();
  const location = useLocation();

  if (isLoadingAuth) return <div>Loading...</div>;

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!hasAnyRole(requiredRoles)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RoleRoute;
