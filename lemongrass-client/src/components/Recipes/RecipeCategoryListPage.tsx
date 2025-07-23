import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import { useRecipesQuery } from "@/hooks/queries/useRecipeQuery";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import RecipeCard from "@/pages/admin/manageRecipe/RecipeCard";

const RecipeCategoryListPage = () => {
  const { categoryId } = useParams();
  const { data: cate, isLoading: loadingCate } = useCategoryQuery();
  const { data: recipes, isLoading: loadingRecipes } = useRecipesQuery();

  const currentCategory = useMemo(() => {
    return cate?.find((c) => c.id === categoryId) ?? null;
  }, [cate, categoryId]);

  const filteredRecipes = useMemo(() => {
    if (!recipes || !categoryId) return [];
    return recipes.filter((r) =>
      r.categories.some((cat) => cat.id === categoryId)
    );
  }, [recipes, categoryId]);

  if (loadingCate || loadingRecipes) return <p>Đang tải...</p>;

  return (
    <div className="max-w-screen-lg mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-6">
        Công thức thuộc danh mục:{" "}
        <span className="text-primary">
          {currentCategory?.name || "Không rõ"}
        </span>
      </h1>

      {filteredRecipes.length > 0 ? (
        <ul className="space-y-4">
          {filteredRecipes.map((recipe: RecipeResponse) => (
            <RecipeCard recipe={recipe} />
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">
          Không có công thức nào trong danh mục này.
        </p>
      )}
    </div>
  );
};

export default RecipeCategoryListPage;
