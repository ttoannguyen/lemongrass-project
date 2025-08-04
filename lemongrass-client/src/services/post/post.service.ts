// src/services/post.service.ts

import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { PostResponse } from "@/types/post/PostResponse";
import type { PostCreate } from "@/types/post/PostCreate";

export const postService = {
  createPost: async (post: PostCreate): Promise<PostResponse[]> => {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("content", post.content);
    formData.append("visibility", post.visibility);

    post.images.forEach((img, index) => {
      formData.append(`images[${index}].file`, img.file);
      formData.append(
        `images[${index}].displayOrder`,
        String(img.displayOrder)
      );
    });

    console.log("in service post", formData, post);

    const res = await api.post<BaseResponse<PostResponse[]>>(
      "/posts",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return res.data.result;
  },

  getPosts: async (): Promise<PostResponse[]> => {
    const res = await api.get<BaseResponse<PostResponse[]>>("/posts", {
      headers: {
        "x-auth-required": "false",
      },
    });
    return res.data.result;
  },

  getPostById: async (id: string): Promise<PostResponse> => {
    const res = await api.get<BaseResponse<PostResponse>>(`/posts/${id}`, {
      headers: {
        "x-auth-required": "false",
      },
    });
    return res.data.result;
  },

  getAccountPost: async (id: string): Promise<PostResponse[]> => {
    const res = await api.get<BaseResponse<PostResponse[]>>(
      `/posts/account/${id}`
    );
    return res.data.result;
  },
};
