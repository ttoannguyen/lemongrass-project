import { useQuery } from "@tanstack/react-query";
import { ingredientService } from "@/services/ingredient/ingredient.service";
import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";

export const useIngredientTemplates = () => {
  return useQuery<IngredientResponse[]>({
    queryKey: ["ingredient_templates"],
    queryFn: ingredientService.getIngredientsTemplate,
    staleTime: 5 * 60 * 1000,
  });
};
