import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { CommentResponse } from "@/types/comment/CommentResponse";
import type { CreateComment } from "@/types/comment/CreateComment";

export const commentService = {
  createComment: async (comment: CreateComment): Promise<CommentResponse> => {
    const res = await api.post<BaseResponse<CommentResponse>>(
      "/comments",
      comment
    );
    return res.data.result;
  },
  getCommentRecipeId: async (id: string): Promise<CommentResponse[]> => {
    const res = await api.get<BaseResponse<CommentResponse[]>>(
      `/comments/recipe/${id}`
    );
    return res.data.result;
  },

  deleteComment: async (commentId: string)=>{
    const res = await api.post<BaseResponse>(`/comments/recipe/${commentId}/delete`)
    return res.data.message;
  }
};
