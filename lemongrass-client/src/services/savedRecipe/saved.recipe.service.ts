import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";

export const savedRecipeService = {
  getsavedRecipes: async (): Promise<RecipeResponse[]> => {
    const res = await api.get<BaseResponse<RecipeResponse[]>>("saved-recipes");
    console.log("in saved recipe service", res.data.result);
    return res.data.result;
  },

  save: async (recipeId: string) => {
    const res = await api.post<BaseResponse>(`saved-recipes/save/${recipeId}`);
    return res.data;
  },

  unsave: async (recipeId: string) => {
    const res = await api.post<BaseResponse>(
      `saved-recipes/unsave/${recipeId}`
    );
    return res.data;
  },
};
