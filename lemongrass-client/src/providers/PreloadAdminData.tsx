// providers/PreloadAdminData.tsx
import { useQuery } from "@tanstack/react-query";
import { roleService } from "@/services/role/role.service";
import { useAuth } from "@/contexts/AuthContext";

export const PreloadAdminData = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { hasRole } = useAuth();

  const isAdmin = hasRole("ADMIN") || hasRole("STAFF"); // tuỳ bạn phân quyền

  useQuery({
    queryKey: ["roles"],
    queryFn: roleService.getRoles,
    staleTime: 5 * 60 * 1000,
    enabled: isAdmin,
  });

  return <>{children}</>;
};
