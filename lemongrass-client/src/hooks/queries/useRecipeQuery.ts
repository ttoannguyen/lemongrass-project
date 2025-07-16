import { useAuth } from "@/contexts/AuthContext";
import { recipeService } from "@/services/recipe/recipe.service";
import { savedRecipeService } from "@/services/savedRecipe/saved.recipe.service";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import { useQuery } from "@tanstack/react-query";

export const useSavedRecipes = () => {
  const { isLoggedIn } = useAuth();
  return useQuery<RecipeResponse[]>({
    queryKey: ["saved-recipe"],
    queryFn: savedRecipeService.getsavedRecipes,
    staleTime: 5 * 60 * 1000,
    enabled: isLoggedIn,
  });
};

export const useRecipesQuery = () => {
  return useQuery<RecipeResponse[]>({
    queryKey: ["recipes"],
    queryFn: recipeService.getRecipes,
    staleTime: 5 * 60 * 1000,
  });
};
