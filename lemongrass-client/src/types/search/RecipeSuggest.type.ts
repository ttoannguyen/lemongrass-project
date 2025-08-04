export type RecipeSuggestion = {
  id: string | null;
  title: string;
  cookingTime: number | null;
  difficulty: "EASY" | "MEDIUM" | "HARD" | null;
  description: string | null;
  servings: number | null;
  accountId: string | null;
  accountName: string | null;
  highlight: {
    "title.suggest"?: string[];
    "ingredients.name.suggest"?: string[];
  } | null;
  isDeleted: boolean;
  categoryIds: string[];
  ingredients: {
    name: string;
    quantity: string | null;
  }[];
  instructions: {
    step: number;
    description: string;
  }[];
  images: {
    url: string;
  }[];
  createdAt: string | null;
  updatedAt: string | null;
};
