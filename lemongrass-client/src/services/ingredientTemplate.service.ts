import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { IngredientTemplateResponse } from "@/types/Recipe/IngredientTemplateResponse";

export const ingredientTemplateService = {
  getTemplate: async (): Promise<IngredientTemplateResponse[]> => {
    const res = await api.get<BaseResponse<IngredientTemplateResponse[]>>(
      "/ingredient_template"
    );
    return res.data.result;
  },
};
