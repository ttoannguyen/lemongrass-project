import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";

export const recipeService = {
  getRecipes: async (): Promise<RecipeResponse[]> => {
    const res = await api.get<BaseResponse<RecipeResponse[]>>("/recipes", {
      headers: {
        "x-auth-required": "false",
      },
    });
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
};
