import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { ReactionRequest } from "@/types/reaction/like.type";

export const reactionService = {
  likePost: async (payload: ReactionRequest): Promise<BaseResponse> => {
    const res = await api.post<BaseResponse>(`/reaction/like`, payload);
    return res.data;
  },

  toggleHeartPost: async (postId: string): Promise<boolean> => {
    const res = await api.post<BaseResponse<boolean>>(
      `/reaction/like/post${postId}`
    );
    console.log(res.data.result);
    return res.data.result;
  },

  toggleHeartRecipe: async (recipeId: string): Promise<boolean> => {
    const res = await api.post<BaseResponse<boolean>>(
      `/reaction/like/recipe/${recipeId}`
    );
    console.log(res.data.result);

    return res.data.result;
  },

  getLikedPostIds: async (): Promise<string[]> => {
    const res = await api.get<BaseResponse<string[]>>(
      "/reaction/like/post/ids"
    );
    return res.data.result;
  },

  getLikedRecipeIds: async (): Promise<string[]> => {
    const res = await api.get<BaseResponse<string[]>>(
      "/reaction/like/recipe/ids"
    );
    console.log(res.data.result);
    return res.data.result;
  },
};
