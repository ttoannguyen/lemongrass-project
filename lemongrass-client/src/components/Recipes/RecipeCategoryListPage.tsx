import { useRecipesQuery } from "@/hooks/queries/useRecipeQuery";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import RecipeItem from "./RecipeItem";

const RecipeCategoryListPage = () => {
  const { categoryId } = useParams();
  // const { data: cate, isLoading: loadingCate } = useCategoryQuery();
  const { data: recipes, isLoading: loadingRecipes } = useRecipesQuery();

  const filteredRecipes = useMemo(() => {
    if (!recipes || !categoryId) return [];
    return recipes.filter((r) =>
      r.categories.some((cat) => cat.id === categoryId)
    );
  }, [recipes, categoryId]);

  if (loadingRecipes) return <p>Đang tải...</p>;

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      {/* helo */}
      {filteredRecipes.length > 0 ? (
        <ul className="flex flex-col mt-6">
          {filteredRecipes.map((recipe: RecipeResponse) => (
            <RecipeItem key={recipe.id} recipe={recipe} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-6">
          Không có công thức nào trong danh mục này.
        </p>
      )}
    </div>
  );
};

export default RecipeCategoryListPage;
