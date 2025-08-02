import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { PagedResponse } from "@/types/PagedResponse";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
type RecipeFilterParams = {
  page?: number;
  size?: number;
  keyword?: string;
  categoryIds?: string[];
  maxTime?: number;
};
export const recipeService = {
  getRecipes: async (
    params?: RecipeFilterParams
  ): Promise<PagedResponse<RecipeResponse>> => {
    const res = await api.get<BaseResponse<PagedResponse<RecipeResponse>>>(
      "/recipes",
      {
        headers: {
          "x-auth-required": "false",
        },
        params: {
          page: params?.page ?? 0,
          size: params?.size ?? 10,
          keyword: params?.keyword,
          categoryIds: params?.categoryIds?.join(","),
          maxTime: params?.maxTime ?? 99999,
        },
      }
    );
    console.log("get-", res.data.result);
    return res.data.result;
  },

  getRecipeById: async (id: string): Promise<RecipeResponse> => {
    const res = await api.get<BaseResponse<RecipeResponse>>(`/recipes/${id}`, {
      headers: {
        "x-auth-required": "false",
      },
    });
    return res.data.result;
  },

  getMyRecipes: async (): Promise<RecipeResponse[]> => {
    const res = await api.get<BaseResponse<RecipeResponse[]>>(
      "/recipes/myRecipes"
    );
    return res.data.result;
  },
};
