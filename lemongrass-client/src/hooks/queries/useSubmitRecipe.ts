// hooks/useSubmitRecipe.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recipeCreateService } from "@/services/recipe/recipe.createFormData.service";
import type { RecipeCreateRequest } from "@/types/Recipe/RecipeRequest";

export const useSubmitRecipe = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: RecipeCreateRequest) => {
      const result = await recipeCreateService.createRecipe(payload);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
  });
};
