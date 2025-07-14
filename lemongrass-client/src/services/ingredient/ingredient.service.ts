import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type {
  IngredientRequest,
  IngredientUpdateRequest,
} from "@/types/ingredient/IngredientRequest";
import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";

export const ingredientService = {
  getIngredientsTemplate: async (): Promise<IngredientResponse[]> => {
    const res = await api.get<BaseResponse<IngredientResponse[]>>(
      "ingredient_template",
      {
        headers: {
          "x-auth-required": "false",
        },
      }
    );
    return res.data.result;
  },

  createIngredientTemplate: async (data: IngredientRequest): Promise<void> => {
    await api.post<BaseResponse<null>>("ingredient_template", data);
  },

  updateIngredientTemplate: async (
    data: IngredientUpdateRequest
  ): Promise<IngredientUpdateRequest> => {
    const res = await api.put<BaseResponse<IngredientUpdateRequest>>(
      `ingredient_template/${data.id}`,
      data
    );
    return res.data.result;
  },

  deleteIngredientTemplate: async (id: string): Promise<void> => {
    await api.delete<BaseResponse<null>>(`ingredient_template/${id}`);
  },
};
