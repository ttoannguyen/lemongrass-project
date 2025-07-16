// services/post/post.service.ts
import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { PostReponse } from "@/types/post/PostResponse";

export const postService = {
  createPost: async (payload: FormData): Promise<PostReponse[]> => {
    const res = await api.post<BaseResponse<PostReponse[]>>("posts", payload, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data.result;
  },
};
