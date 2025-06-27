// hooks/useFeed.ts
import { ingredientUnitService } from "@/services/ingredientUnit.service";
import { useApi } from "./useApi";
import type { IngredientUnitResponse } from "@/types/Recipe/IngredientUnitResponse";

export const useIngredientUnit = () => {
  return useApi<IngredientUnitResponse[]>(ingredientUnitService.getUnits);
};
