import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { CategoryResponse } from "@/types/category/CategoryResponse";

export const categoryService = {
  getCategories: async (): Promise<CategoryResponse[]> => {
    const res = await api.get<BaseResponse<CategoryResponse[]>>("categories", {
      headers: {
        "x-auth-required": "false",
      },
    });
    console.log("in category service", res.data.result);
    return res.data.result;
  },

  addCategory: async (
    name: string,
    type: string
  ): Promise<CategoryResponse> => {
    const res = await api.post<BaseResponse<CategoryResponse>>("categories", {
      name: name,
      type: type,
    });
    return res.data.result;
  },

  updateCategory: async (
    id: string,
    name: string,
    type: string
  ): Promise<CategoryResponse> => {
    console.log("hello", { id: id, name: name, type: type });
    const res = await api.put<BaseResponse<CategoryResponse>>(
      `categories/${id}`,
      { id: id, name: name, type: type }
    );
    return res.data.result;
  },

  deleteCategory: async (id: string): Promise<void> => {
    await api.delete<BaseResponse<null>>(`categories/${id}`);
  },
};
