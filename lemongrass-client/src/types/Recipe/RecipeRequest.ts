import type { Difficulty } from "../enums/difficulty.enum";
import type { ImageDto } from "../image/ImageDto";
import type { TagDto } from "../tag/TagDto";
import type { RecipeIngredientRequest } from "./RecipeIngredientRequest";
import type { RecipeInstructionRequest } from "./RecipeInstructionRequest";

export type RecipeCreateRequest = {
  title: string;
  cookingTime: number;
  difficulty: Difficulty;
  servings: number;
  category: string;
  tags: TagDto[];
  ingredients: RecipeIngredientRequest[];
  instructions: RecipeInstructionRequest[];
  images?: ImageDto[];
};
