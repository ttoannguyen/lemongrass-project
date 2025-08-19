import axios from "@/lib/axios";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import type { RecipeSuggestion } from "@/types/search/RecipeSuggest.type";

export const recipeSearchService = {
  autocomplete: async (keyword: string): Promise<RecipeSuggestion> => {
    const res = await axios.post(
      "/recipes/autocomplete",
      {
        keyword: { keyword },
      },

      {
        headers: {
          "x-auth-required": "false",
        },
      }
    );
    return res.data;
  },

  searchRecipes: async (params: { keyword: string }): Promise<RecipeResponse[]> => {
    const res = await axios.post<RecipeResponse[]>(
      "/recipes/search",
      {
        keyword: params.keyword,
      },
      {
        headers: {
          "x-auth-required": "false",
        },
      }
    );
    console.log("search ",res.data);
    return res.data;
  },
};
