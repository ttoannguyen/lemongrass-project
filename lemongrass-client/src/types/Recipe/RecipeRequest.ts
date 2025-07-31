import type { Difficulty } from "../enums/difficulty.enum";
import type { ImageUpload } from "../image/ImageUpload";
import type { RecipeIngredientRequest } from "./RecipeIngredientRequest";
import type { RecipeInstructionRequest } from "./RecipeInstructionRequest";

export type RecipeCreateRequest = {
  title: string; //
  cookingTime: number; //
  description: string; //
  difficulty: Difficulty; //
  servings: number; //
  categoryIds: string[];
  ingredients: RecipeIngredientRequest[];
  instructions: RecipeInstructionRequest[];
  images: ImageUpload[];
};
