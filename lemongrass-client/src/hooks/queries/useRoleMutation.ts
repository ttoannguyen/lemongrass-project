import { roleService } from "@/services/role/role.service";
import type { RoleRequest } from "@/types/roles/RoleRequest";
import extractErrorMessage from "@/utils/extractErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
export const useAddRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RoleRequest) => roleService.createRole(data),
    onSuccess: () => {
      toast.success("Đã thêm vai trò");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
};

export const useUpdateRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: RoleRequest) => roleService.updateRole(data),
    onSuccess: () => {
      toast.success("Chỉnh sửa vai trò thành công");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
};
