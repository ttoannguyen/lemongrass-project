"use client";

import { useRecipesQuery } from "@/hooks/queries/useRecipeQuery";
import RecipeList from "./RecipeList";

const VerifiedRecipeTab = () => {
  const { data: recipes = [], isLoading } = useRecipesQuery();
  const verified = recipes.filter((r) => r.verified);

  return (
    <div>
      <h2 className="font-medium text-lg mb-2">Công thức đã duyệt</h2>
      <RecipeList recipes={verified} loading={isLoading} />
    </div>
  );
};

export default VerifiedRecipeTab;
