import { Difficulty } from "@/types/enums/difficulty.enum";

export type RecipeIngredientUpdateRequest = {
  id?: string;
  templateId: string;
  unitId: string;
  quantity: number;
  note?: string;
  orderIndex: number;
};

export type RecipeInstructionUpdateRequest = {
  id?: string;
  stepNumber: number;
  description: string;
  images: ImageUpdateUpload[];
};

export type ImageUpdateUpload = {
  id?: string;
  previewUrl?: string;
  file?: File;
  displayOrder: number;
};

export type RecipeUpdateRequest = {
  id: string;
  title: string;
  description: string;
  cookingTime: number;
  servings: number;
  difficulty: Difficulty;
  categoryIds: string[];
  ingredients: RecipeIngredientUpdateRequest[];
  instructions: RecipeInstructionUpdateRequest[];
  images: ImageUpdateUpload[];
};
