import type { BaseResponse } from "@/types/BaseResponse";
import api from "@/lib/axios";
import type { RolePermission } from "@/types";

export const permissionService = {
  getPermissions: async (): Promise<RolePermission[]> => {
    const res = await api.get<BaseResponse<RolePermission[]>>("permissions");
    return res.data.result;
  },
};
