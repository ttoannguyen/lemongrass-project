import type { IngredientTemplateResponse } from "@/types/Recipe/IngredientTemplateResponse";
import { ingredientTemplateService } from "@/services/ingredientTemplate.service";
import { useQuery } from "@tanstack/react-query";

export const useIngredientTemplates = () => {
  return useQuery<IngredientTemplateResponse[]>({
    queryKey: ["ingredient-units"],
    queryFn: ingredientTemplateService.getTemplate,
    staleTime: 5 * 60 * 1000,
  });
};
