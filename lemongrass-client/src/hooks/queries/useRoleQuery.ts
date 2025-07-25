import { roleService } from "@/services/role/role.service";
import type { Role } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useRoleQuery = () => {
  return useQuery<Role[]>({
    queryKey: ["roles"],
    queryFn: roleService.getRoles,
    staleTime: 5 * 60 * 1000,
  });
};
