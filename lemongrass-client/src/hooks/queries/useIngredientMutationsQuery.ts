import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  IngredientRequest,
  IngredientUpdateRequest,
} from "@/types/ingredient/IngredientRequest";
import { ingredientService } from "@/services/ingredient/ingredient.service";
import { toast } from "sonner";
import extractErrorMessage from "@/utils/extractErrorMessage";

export const useAddIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IngredientRequest) => {
      console.log(data);
      return ingredientService.createIngredientTemplate(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredient_templates"] });
    },
  });
};

export const useUpdateIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: IngredientUpdateRequest) =>
      ingredientService.updateIngredientTemplate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredient_templates"] });
    },
    onError: (error) => {
      console.error("Lỗi update ingredient:", error);
      toast.error(extractErrorMessage(error));
    },
  });
};

export const useDeleteIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ingredientService.deleteIngredientTemplate(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredient_templates"] });
    },
  });
};
