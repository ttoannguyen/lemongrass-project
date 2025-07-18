import type { ImageResponse } from "../image/ImageResponse";
import type { AccountShortResponse } from "../AccountShortResponse";
import type { TagDto } from "../tag/TagDto";
import type { CategoryResponse } from "../category/CategoryResponse";
import type { IngredientResponse } from "../ingredient/IngredientResponse";

export interface RecipeFeedItem {
  id: string;
  type: "RECIPE";
  createAt: string;
  accountShortResponse: AccountShortResponse | null;
  imageResponses: ImageResponse[];
  isVerified: boolean | null;
  title: string;
  category: CategoryResponse[];
  difficulty: "EASY" | "MEDIUM" | "HARD";
  cookingTime: number;
  servings: number;
  rating: number | null;
  tags: TagDto[];
  ingredients: IngredientResponse[];
}
