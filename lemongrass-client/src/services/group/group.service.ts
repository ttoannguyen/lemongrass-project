import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { GroupCreateRequest } from "@/types/group/GroupCreateRequest";
import type { GroupResponse } from "@/types/group/GroupResponse";

export const groupService = {
  createGroup: async (group: GroupCreateRequest): Promise<GroupResponse> => {
    const res = await api.post<BaseResponse<GroupResponse>>("groups", group);
    return res.data.result;
  },
};
