import { useApi } from "./useApi";
import type { IngredientTemplateResponse } from "@/types/Recipe/IngredientTemplateResponse";
import { ingredientTemplateService } from "@/services/ingredientTemplate.service";

export const useIngredientTemplates = () => {
  return useApi<IngredientTemplateResponse[]>(
    ingredientTemplateService.getTemplate
  );
};
