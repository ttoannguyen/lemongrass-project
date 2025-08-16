import type { AccountShortResponse } from "../AccountShortResponse";

export interface RecipeResponse {
  accountShortResponse: AccountShortResponse;
  id: string;
  title: string;
  cookingTime: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  servings: number;
  ratingAvg: number;
  ratingCount: number;
  createdBy: string;
  description: string;
  lastModifiedBy: string;
  createdDate: string;
  lastModifiedDate: string;
  categories: {
    id: string;
    name: string;
    type: string;
  }[];
  shareCount: number;
  verified: boolean;

  // tags?: {
  //   name: string;
  //   color: string;
  // }[];

  images: {
    url: string;
    displayOrder: number;
  }[];

  ingredients: {
    // templateId: string | undefined;
    id: string;
    name: string;
    quantity: string;
    order: number;
    unitName: string;
    note: string;
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
