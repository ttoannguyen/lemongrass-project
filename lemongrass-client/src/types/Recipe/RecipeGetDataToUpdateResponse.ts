import type { AccountShortResponse } from "../AccountShortResponse";

export interface RecipeGetDataToUpdateResponse {
  accountShortResponse: AccountShortResponse;
  id: string;
  title: string;
  cookingTime: number;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  servings: number;
  ratingAvg: number;
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

  tags: {
    name: string;
    color: string;
  }[];

  images: {
    id:string;
    url: string;
    displayOrder: number;
  }[];

  ingredients: {
    id: string;
    templateId: string;
    unitId: string;
    quantity: string;
    order: number;
    note: string;
  }[];

  instructions: {
    id: string;
    stepNumber: number;
    description: string;
    images: {
      id: string;
      url: string;
      displayOrder: number;
    }[];
  }[];
}
