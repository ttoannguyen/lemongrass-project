import { recipeService } from "@/services/recipe/recipe.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSubmitRating = (recipeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (rating: number) => {
      return recipeService.rating(recipeId, rating);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe", recipeId] });
    },
  });
};
