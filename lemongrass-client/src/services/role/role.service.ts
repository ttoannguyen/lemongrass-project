import api from "@/lib/axios";
import type { Role } from "@/types";
import type { BaseResponse } from "@/types/BaseResponse";
import type { RoleRequest } from "@/types/roles/RoleRequest";

export const roleService = {
  getRoles: async (): Promise<Role[]> => {
    const res = await api.get<BaseResponse<Role[]>>("roles");
    console.log("in roles service", res.data.result);
    return res.data.result;
  },
  createRole: async (data: RoleRequest): Promise<Role> => {
    const res = await api.post<BaseResponse<Role>>("roles", data);
    console.log("in role add", res.data.result);
    return res.data.result;
  },

  updateRole: async (data: RoleRequest): Promise<Role> => {
    const res = await api.put<BaseResponse<Role>>("roles", data);
    console.log("update role", res.data.result);
    return res.data.result;
  },
};
