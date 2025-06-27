import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { IngredientUnitResponse } from "@/types/Recipe/IngredientUnitResponse";

export const ingredientUnitService = {
  getUnits: async (): Promise<IngredientUnitResponse[]> => {
    const res = await api.get<BaseResponse<IngredientUnitResponse[]>>("/units");
    return res.data.result;
  },
};
