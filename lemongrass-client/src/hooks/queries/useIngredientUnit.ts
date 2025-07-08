// hooks/queries/useIngredientUnitQuery.ts
import { useQuery } from "@tanstack/react-query";
import { ingredientUnitService } from "@/services/ingredientUnit.service";
import type { IngredientUnitResponse } from "@/types/Recipe/IngredientUnitResponse";

export const useIngredientUnitQuery = () => {
  return useQuery<IngredientUnitResponse[]>({
    queryKey: ["ingredient-units"],
    queryFn: ingredientUnitService.getUnits,
    staleTime: 5 * 60 * 1000,
  });
};
