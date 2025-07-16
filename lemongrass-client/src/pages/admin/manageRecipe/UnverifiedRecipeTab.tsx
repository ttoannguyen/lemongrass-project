"use client";

import { useRecipesQuery } from "@/hooks/queries/useRecipeQuery";
import RecipeList from "./RecipeList";

const UnverifiedRecipeTab = () => {
  const { data: recipes = [], isLoading } = useRecipesQuery();
  const unverified = recipes.filter((r) => !r.verified);

  return (
    <div>
      <h2 className="font-medium text-lg mb-2">Công thức chưa duyệt</h2>
      <RecipeList recipes={unverified} loading={isLoading} />
    </div>
  );
};

export default UnverifiedRecipeTab;
