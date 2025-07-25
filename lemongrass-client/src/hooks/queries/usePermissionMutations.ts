import { useMutation, useQueryClient } from "@tanstack/react-query";
import { permissionService } from "@/services/permission/permission.service";
import { toast } from "sonner";
import extractErrorMessage from "@/utils/extractErrorMessage";
import type { PermissionRequest } from "@/types/roles/PermissionRequest";

export const useAddPermission = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PermissionRequest) => permissionService.create(data),
    onSuccess: () => {
      toast.success("Đã thêm quyền hạn");
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
    },
    onError: (error) => {
      toast.error(extractErrorMessage(error));
    },
  });
};

// export const useUpdatePermission = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data: PermissionUpdateRequest) =>
//       permissionService.update(data),
//     onSuccess: () => {
//       toast.success("Đã cập nhật quyền hạn");
//       queryClient.invalidateQueries({ queryKey: ["permissions"] });
//     },
//     onError: (error) => {
//       toast.error(extractErrorMessage(error));
//     },
//   });
// };

// export const useDeletePermission = () => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id: string) => permissionService.delete(id),
//     onSuccess: () => {
//       toast.success("Đã xóa quyền hạn");
//       queryClient.invalidateQueries({ queryKey: ["permissions"] });
//     },
//     onError: (error) => {
//       toast.error(extractErrorMessage(error));
//     },
//   });
// };
