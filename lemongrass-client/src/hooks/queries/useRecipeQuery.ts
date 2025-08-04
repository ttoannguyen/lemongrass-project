import { useAuth } from "@/contexts/AuthContext";
import { recipeService } from "@/services/recipe/recipe.service";
import { savedRecipeService } from "@/services/savedRecipe/saved.recipe.service";
import type { PagedResponse } from "@/types/PagedResponse";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
type RecipeFilterParams = {
  page?: number;
  size?: number;
  keyword?: string;
  categoryIds?: string[];
  maxTime?: number;
};
export const useSavedRecipes = () => {
  const { isLoggedIn } = useAuth();
  return useQuery<RecipeResponse[]>({
    queryKey: ["saved-recipe"],
    queryFn: savedRecipeService.getsavedRecipes,
    staleTime: 5 * 60 * 1000,
    enabled: isLoggedIn,
  });
};

export const useRecipesQuery = (params?: RecipeFilterParams) => {
  return useQuery<PagedResponse<RecipeResponse>>({
    queryKey: ["recipes", params],
    queryFn: () => recipeService.getRecipes(params),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};


export const useAccountRecipeQuery = (id?: string) => {
  const { isLoggedIn } = useAuth();

  return useQuery<RecipeResponse[]>({
    queryKey: ["account-recipe", id],
    queryFn: () => recipeService.getAccountRecipe(id!),
    enabled: !!id && isLoggedIn,
    staleTime: 5 * 60 * 1000,
  });
};
