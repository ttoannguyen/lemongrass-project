import type { Tag } from "../Tag";
import type { IngredientShortResponse } from "../IngredientShortResponse";
import type { ImageResponse } from "../ImageResponse";
import type { AccountShortResponse } from "../AccountShortResponse";

export interface RecipeFeedItem {
  id: string;
  type: "RECIPE";
  createAt: string;
  accountShortResponse: AccountShortResponse | null;
  imageResponses: ImageResponse[];
  isVerified: boolean | null;
  title: string;
  category: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  cookingTime: number;
  servings: number;
  rating: number | null;
  tags: Tag[];
  ingredientShortResponses: IngredientShortResponse[];
}
