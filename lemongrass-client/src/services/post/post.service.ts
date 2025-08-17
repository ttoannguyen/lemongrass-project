// src/services/post.service.ts

import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { PostResponse } from "@/types/post/PostResponse";
import type { PostCreate } from "@/types/post/PostCreate";
import type { PagedResponse } from "@/types/PagedResponse";

type PostFilterParams = {
  page?: number;
  size?: number;
  keyword?: string;
  groupId?: string;
};
export const postService = {
  createPost: async (post: PostCreate): Promise<PostResponse[]> => {
    const formData = new FormData();
    formData.append("title", post.title);
    formData.append("mainContents", post.mainContents);
    formData.append("visibility", post.visibility);

    post.contents?.forEach((content, i) => {
      if (content.file) {
        formData.append(`contents[${i}].file`, content.file);
      }
      formData.append(
        `contents[${i}].displayOrder`,
        content.displayOrder.toString()
      );
      formData.append(`contents[${i}].contentTitle`, content.contentTitle);
      formData.append(`contents[${i}].text`, content.text);
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

  getPosts: async (
    params?: PostFilterParams
  ): Promise<PagedResponse<PostResponse>> => {
    const res = await api.get<BaseResponse<PagedResponse<PostResponse>>>(
      "/posts",
      {
        headers: {
          "x-auth-required": "false",
        },
        params: {
          page: params?.page ?? 0,
          size: params?.size ?? 10,
          keyword: params?.keyword,
          groupId: params?.groupId,
        },
      }
    );
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
