import { useState } from "react";
import RecipeItem from "@/components/recipes/RecipeItem";
import { useRecipesQuery } from "@/hooks/queries/useRecipeQuery";
import RecipeItemSkeleton from "@/components/skeleton/RecipeItemSkeleton";

// Bộ lọc đơn giản
const simpleOptions = [
  { label: "Under 20 mins", value: "20" },
  { label: "Under 30 mins", value: "30" },
  { label: "Under 40 mins", value: "40" },
  { label: "Easy treats", value: "easy_treats" },
];

const QuickAndEasyPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("20");

  const getFilterFromValue = (value: string) => {
    if (value === "easy_treats") {
      return {
        keyword: "treat",
        // maxTime: 999,
      };
    }
    return {
      keyword: "",
      maxTime: parseInt(value),
    };
  };

  const [filters, setFilters] = useState({
    page: 0,
    size: 20,
    categoryIds: [] as string[],
    ...getFilterFromValue("20"),
  });

  const handleSimpleFilterChange = (value: string) => {
    setSelectedFilter(value);
    const newFilter = getFilterFromValue(value);
    setFilters((prev) => ({
      ...prev,
      ...newFilter,
      page: 0, // reset về trang đầu
    }));
  };

  const { data, isLoading, isFetching } = useRecipesQuery(filters);
  const recipes = Array.isArray(data?.content) ? data.content : [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="mx-auto max-w-7xl p-4">
      <h1 className="text-2xl font-semibold mb-4">Công thức Nhanh & Dễ</h1>

      <div className="flex gap-4 flex-wrap mb-6">
        {simpleOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSimpleFilterChange(option.value)}
            className={`px-6 py-2 rounded-full font-semibold border transition
              ${
                selectedFilter === option.value
                  ? "bg-pink-100 text-black border-foreground"
                  : "bg-muted text-muted-foreground border-transparent"
              }
            `}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Danh sách công thức */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-200">
        {isLoading || isFetching
          ? Array.from({ length: 12 }).map((_, idx) => (
              <RecipeItemSkeleton key={idx} />
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

      {/* Phân trang */}
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

export default QuickAndEasyPage;
