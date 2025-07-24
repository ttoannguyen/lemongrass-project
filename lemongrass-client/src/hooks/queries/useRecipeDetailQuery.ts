import { useQuery } from "@tanstack/react-query";

import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import { recipeService } from "@/services/recipe/recipe.service";

export const useRecipeDetail = (id: string) => {
  return useQuery<RecipeResponse>({
    queryKey: ["recipe", id],
    queryFn: () => recipeService.getRecipeById(id),
    enabled: !!id,
    staleTime: 300_000,
  });
};


export const useMyRecipes = () => {
  return useQuery<RecipeResponse[]>({
    queryKey: ["my-recipe"],
    queryFn: recipeService.getMyRecipes,
    staleTime: 300_000,
  });
};
