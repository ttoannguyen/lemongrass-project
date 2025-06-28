import api from "@/lib/axios";
import type { RecipeCreateRequest } from "@/types/Recipe/RecipeRequest";
import type { BaseResponse } from "@/types/BaseResponse";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";

// Hàm chuyển đổi từ object sang FormData
const toFormData = (data: RecipeCreateRequest): FormData => {
  const formData = new FormData();

  formData.append("title", data.title);
  formData.append("cookingTime", data.cookingTime.toString());
  formData.append("difficulty", data.difficulty);
  formData.append("servings", data.servings.toString());
  formData.append("category", data.category);

  // Tags
  data.tags?.forEach((tag, index) => {
    formData.append(`tags[${index}].color`, tag.color);
    formData.append(`tags[${index}].name`, tag.name);
  });

  // Ingredients
  data.ingredients?.forEach((ing, i) => {
    formData.append(`ingredients[${i}].templateId`, ing.templateId);
    formData.append(`ingredients[${i}].unitId`, ing.unitId);
    formData.append(`ingredients[${i}].quantity`, ing.quantity.toString());
    formData.append(`ingredients[${i}].note`, ing.note ?? "");
    formData.append(`ingredients[${i}].orderIndex`, ing.orderIndex.toString());
  });

  // Instructions
  data.instructions?.forEach((ins, i) => {
    formData.append(`instructions[${i}].stepNumber`, ins.stepNumber.toString());
    formData.append(`instructions[${i}].description`, ins.description);

    ins.images?.forEach((image, j) => {
      if (image?.file instanceof File) {
        formData.append(`instructions[${i}].images[${j}].file`, image.file);
        formData.append(
          `instructions[${i}].images[${j}].displayOrder`,
          image.displayOrder.toString()
        );
      }
    });
  });

  // Recipe images (các ảnh chính)
  data.images?.forEach((img, i) => {
    if (img?.file instanceof File) {
      formData.append(`images[${i}].file`, img.file);
      formData.append(`images[${i}].displayOrder`, i.toString());
    }
  });

  return formData;
};

export const recipeService = {
  createRecipe: async (data: RecipeCreateRequest) => {
    const formData = toFormData(data);
    const res = await api.post<BaseResponse<RecipeResponse>>(
      "/recipes",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res.data.result);
    return res.data.result;
  },
};
