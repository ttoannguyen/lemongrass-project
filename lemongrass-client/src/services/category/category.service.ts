import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { CategoryDto } from "@/types/category/CategoryDto";

export const categoryService = {
  getCategories: async (): Promise<CategoryDto[]> => {
    const res = await api.get<BaseResponse<CategoryDto[]>>("categories", {
      headers: {
        "x-auth-required": "false",
      },
    });
    console.log("in category service", res.data.result);
    return res.data.result;
  },
};
