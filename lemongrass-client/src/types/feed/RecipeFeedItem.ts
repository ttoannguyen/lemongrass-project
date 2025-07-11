import type { ImageResponse } from "../image/ImageResponse";
import type { AccountShortResponse } from "../AccountShortResponse";
import type { IngredientDto } from "../ingredient/IngredientDto";
import type { TagDto } from "../tag/TagDto";
import type { CategoryDto } from "../category/CategoryDto";

export interface RecipeFeedItem {
  id: string;
  type: "RECIPE";
  createAt: string;
  accountShortResponse: AccountShortResponse | null;
  imageResponses: ImageResponse[];
  isVerified: boolean | null;
  title: string;
  category: CategoryDto[];
  difficulty: "EASY" | "MEDIUM" | "HARD";
  cookingTime: number;
  servings: number;
  rating: number | null;
  tags: TagDto[];
  ingredients: IngredientDto[];
}
