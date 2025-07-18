import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";

export const postReactionService = {
  toggleHeart: async (postId: string, receiverUserId: string) => {
    const res = await api.post<BaseResponse<boolean>>("/reactions/toggle", {
      targetId: postId,
      receiverId: receiverUserId,
      targetType: "POST",
    });
    return res.data.result;
  },
};
