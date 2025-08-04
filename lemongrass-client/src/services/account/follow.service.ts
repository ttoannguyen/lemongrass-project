import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { Follow } from "@/types/follow/Follow";
import type { FollowCount } from "@/types/follow/FollowCount";

export const followService = {
  getCountFollow: async (id: string): Promise<FollowCount> => {
    const res = await api.get<BaseResponse<FollowCount>>(
      `/follows/follow-count-by-id/${id}`
    );
    return res.data.result;
  },

  follow: async (payload: Follow) => {
    const res = await api.post<BaseResponse>(`/follows/setFollow`, payload);
    return res.data;
  },

  unFollow: async (payload: Follow) => {
    const res = await api.post<BaseResponse>(`/follows/unFollow`, payload);
    return res.data;
  },

  isFollowing: async (id: string): Promise<boolean> => {
    const res = await api.get<BaseResponse<boolean>>(
      `/follows/is-following/${id}`
    );
    return res.data.result;
  },
};
