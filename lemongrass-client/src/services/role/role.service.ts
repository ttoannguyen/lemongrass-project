import api from "@/lib/axios";
import type { Role } from "@/types";
import type { BaseResponse } from "@/types/BaseResponse";

export const roleService = {
  getRoles: async (): Promise<Role[]> => {
    const res = await api.get<BaseResponse<Role[]>>("roles");
    console.log("in roles service", res.data.result);
    return res.data.result;
  },
};
