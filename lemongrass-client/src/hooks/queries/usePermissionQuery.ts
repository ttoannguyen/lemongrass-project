import { permissionService } from "@/services/permission/permission.service";
import type { RolePermission } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const usePermissionQuery = () => {
  return useQuery<RolePermission[]>({
    queryKey: ["permissions"],
    queryFn: permissionService.getPermissions,
    staleTime: 5 * 60 * 1000,
  });
};
