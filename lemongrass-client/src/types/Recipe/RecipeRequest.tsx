import type { Difficulty } from "../enums/difficulty.enum";
import type { ImageDto } from "../image/ImageDto";
import type { IngredientDto } from "../ingredient/IngredientDto";
import type { InstructionDto } from "../instruction/InstructionDto";
import type { TagDto } from "../tag/TagDto";

export type RecipeCreateRequest = {
  title: string;
  cookingTime: number;
  difficulty: Difficulty;
  servings: number;
  category: string;
  tags: TagDto[];
  ingredients: IngredientDto[];
  instructions: InstructionDto[];
  images?: ImageDto[];
};
