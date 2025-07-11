import type { PostCreate } from "./../../types/post/PostCreate";
import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { PostReponse } from "@/types/post/PostResponse";

export const postService = {
  createPost: async (payload: PostCreate): Promise<PostReponse[]> => {
    const res = await api.post<BaseResponse<PostReponse[]>>("posts", payload);
    return res.data.result;
  },
};
