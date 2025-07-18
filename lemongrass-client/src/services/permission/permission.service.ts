import type { BaseResponse } from "@/types/BaseResponse";
import api from "@/lib/axios";
import type { PermissionRequest } from "@/types/roles/PermissionRequest";
import type { PermissionResponse } from "@/types/roles/PermissionResponse";

export const permissionService = {
  getPermissions: async (): Promise<PermissionResponse[]> => {
    const res = await api.get<BaseResponse<PermissionResponse[]>>(
      "permissions"
    );
    return res.data.result;
  },

  create: async (data: PermissionRequest): Promise<PermissionResponse> => {
    const res = await api.post<BaseResponse<PermissionResponse>>(
      "permissions",
      data
    );
    return res.data.result;
  },
};
