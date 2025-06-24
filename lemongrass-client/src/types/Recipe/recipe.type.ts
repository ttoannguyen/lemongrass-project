import type { Difficulty } from "../enums/difficulty.enum";
import type { Ingredient } from "../Ingredient";
import type { Instruction } from "../Instruction";
import type { Tag } from "../Tag";

export interface RecipeItem {
  id: string;
  title: string;
  cookingTime: number;
  difficulty: Difficulty;
  servings: number;
  category: string;
  tags: Tag[];
  shareCount: number;
  ingredients: Ingredient[];
  instructions: Instruction[];
  verified: boolean;
}
