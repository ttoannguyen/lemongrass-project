import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { GroupCreateRequest } from "@/types/group/GroupCreateRequest";
import type { GroupJoinResponse } from "@/types/group/GroupJoinResponse";
import type { GroupResponse } from "@/types/group/GroupResponse";

export const groupService = {
  createGroup: async (group: GroupCreateRequest): Promise<GroupResponse> => {
    const res = await api.post<BaseResponse<GroupResponse>>("groups", group);
    return res.data.result;
  },

  getMyGroup: async (): Promise<GroupResponse[]> => {
    const res = await api.get<BaseResponse<GroupResponse[]>>("/groups/myGroup");
    return res.data.result;
  },

  getGroupById: async (id: string): Promise<GroupResponse> => {
    const res = await api.get<BaseResponse<GroupResponse>>(`/groups/${id}`);
    return res.data.result;
  },
  checkJoin: async (id: string): Promise<boolean> => {
    const res = await api.get<BaseResponse<boolean>>(
      `/groups/check-join/${id}`
    );
    return res.data.result;
  },

  joinGroup: async (id: string): Promise<GroupJoinResponse> => {
    const res = await api.post<BaseResponse<GroupJoinResponse>>(
      `/groups/${id}/join`
    );
    return res.data.result;
  },

  leaveGroup: async (id: string) => {
    const res = await api.post<BaseResponse>(`/groups/${id}/leave`);
    return res.data.message;
  },
};
