import type { AccountShortResponse } from "../AccountShortResponse";

export interface RecipeResponse {
  accountShortResponse: AccountShortResponse;
  id: string;
  title: string;
  cookingTime: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  servings: number;
  category: {
    id: string;
    name: string;
  }[];
  shareCount: number;
  verified: boolean;

  tags: {
    name: string;
    color: string;
  }[];

  images: {
    url: string;
    displayOrder: number;
  }[];

  ingredients: {
    id: string;
    name: string;
    quantity: string;
    order: number;
  }[];

  instructions: {
    id: string;
    stepNumber: number;
    description: string;
    images: {
      url: string;
      displayOrder: number;
    }[];
  }[];
}
