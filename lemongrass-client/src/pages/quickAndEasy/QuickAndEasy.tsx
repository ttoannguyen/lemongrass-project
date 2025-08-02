import { useState } from "react";
import { useRecipesQuery } from "@/hooks/queries/useRecipeQuery";
import RecipeItem from "@/components/recipes/RecipeItem";

const QuickAndEasy = () => {
  const [filters, setFilters] = useState({
    page: 0,
    size: 8,
    keyword: "",
    difficulty: "EASY", // lọc theo độ khó
    // Nếu bạn có thuộc tính `maxTime`, bạn có thể thêm:
    // maxCookingTime: 30,
  });

  const { data, isLoading, isFetching } = useRecipesQuery(filters);

  const recipes = Array.isArray(data?.content) ? data.content : [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="mx-auto max-w-7xl p-4">
      <h1 className="text-2xl font-semibold mb-4">Công thức Nhanh & Dễ</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 min-h-200">
        {isLoading || isFetching
          ? Array.from({ length: filters.size }).map((_, idx) => (
              <div
                key={idx}
                className="animate-pulse bg-muted h-40 rounded-md"
              />
            ))
          : recipes.map((recipe) => (
              <RecipeItem
                key={recipe.id}
                recipe={recipe}
                ratingCount={10}
                isFavorite={false}
              />
            ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            disabled={filters.page === 0}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Trang trước
          </button>
          <span className="text-sm">
            Trang <strong>{filters.page + 1}</strong> / {totalPages}
          </span>
          <button
            onClick={() =>
              setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            disabled={filters.page + 1 >= totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
};

export default QuickAndEasy;
