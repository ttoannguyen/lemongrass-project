import { useAuth } from "@/contexts/AuthContext";
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
