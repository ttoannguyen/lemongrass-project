import api from "@/lib/axios";
import type { BaseResponse } from "@/types/BaseResponse";
import type { RecipeGetDataToUpdateResponse } from "@/types/Recipe/RecipeGetDataToUpdateResponse";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import type { RecipeUpdateRequest } from "@/types/Recipe/RecipeUpdateRequest";
const toUpdateFormData = (data: RecipeUpdateRequest): FormData => {
  const formData = new FormData();

  formData.append("id", data.id); // thêm id để BE biết update

  formData.append("title", data.title);
  formData.append("cookingTime", data.cookingTime.toString());
  formData.append("difficulty", data.difficulty);
  formData.append("description", data.description);
  formData.append("servings", data.servings.toString());
  data.categoryIds?.forEach((cat, index) => {
    formData.append(`categoryIds[${index}]`, cat);
  });

  // Ingredients
  data.ingredients?.forEach((ing, i) => {
    if (ing.id) formData.append(`ingredients[${i}].id`, ing.id);
    formData.append(`ingredients[${i}].templateId`, ing.templateId);
    formData.append(`ingredients[${i}].unitId`, ing.unitId);
    formData.append(`ingredients[${i}].quantity`, ing.quantity.toString());
    formData.append(`ingredients[${i}].note`, ing.note ?? "");
    formData.append(`ingredients[${i}].orderIndex`, ing.orderIndex.toString());
  });

  // Instructions
  data.instructions?.forEach((ins, i) => {
    if (ins.id) formData.append(`instructions[${i}].id`, ins.id);
    formData.append(`instructions[${i}].stepNumber`, ins.stepNumber.toString());
    formData.append(`instructions[${i}].description`, ins.description);

    ins.images?.forEach((image, j) => {
      if (image.id) {
        // ảnh cũ → chỉ gửi id & displayOrder
        formData.append(`instructions[${i}].images[${j}].id`, image.id);
        formData.append(
          `instructions[${i}].images[${j}].displayOrder`,
          image.displayOrder.toString()
        );
      } else if (image.file instanceof File) {
        // ảnh mới → gửi file
        formData.append(`instructions[${i}].images[${j}].file`, image.file);
        formData.append(
          `instructions[${i}].images[${j}].displayOrder`,
          image.displayOrder.toString()
        );
      }
    });
  });

  // Recipe images
  data.images?.forEach((img, i) => {
    if (img.id) {
      formData.append(`images[${i}].id`, img.id);
      formData.append(`images[${i}].displayOrder`, img.displayOrder.toString());
    } else if (img.file instanceof File) {
      formData.append(`images[${i}].file`, img.file);
      formData.append(`images[${i}].displayOrder`, img.displayOrder.toString());
    }
  });

  return formData;
};

export const recipeUpdateService = {
  getData: async (id: string): Promise<RecipeGetDataToUpdateResponse> => {
    const res = await api.get<BaseResponse<RecipeGetDataToUpdateResponse>>(
      `/recipes/getUpdate/${id}`
    );
    return res.data.result;
  },
  update: async (
    recipeId: string,
    data: RecipeUpdateRequest,
    onProgress?: (progress: number) => void
  ) => {
    const formData = toUpdateFormData(data);
    const res = await api.put<BaseResponse<RecipeResponse>>(
      `/recipes`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            onProgress?.(percent);
          }
        },
      }
    );
    return res.data.result;
  },
};
