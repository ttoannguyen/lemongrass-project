import RecipeBreadcrumbBar from "@/components/breadcrum/RecipeBreadcrumbBar";
import AdvancedRecipeFilter from "@/components/recipes/filter/AdvancedRecipeFilter";
import RecipeItem from "@/components/recipes/RecipeItem";
import { useRecipesQuery } from "@/hooks/queries/useRecipeQuery";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const RecipePage = () => {
  const [filters, setFilters] = useState({
    page: 0,
    size: 20,
    keyword: "",
    categoryIds: [],
    difficulty: "",
    maxTime: undefined,
    minRating: undefined,
  });

  const [searchedIds, setSearchedIds] = useState<string[] | null>(null);

  const { data, isLoading, isFetching } = useRecipesQuery(filters);
  const recipes = Array.isArray(data?.content) ? data.content : [];
  const totalPages = data?.totalPages ?? 1;
  const filteredRecipes = searchedIds
    ? recipes.filter((r) => searchedIds.includes(r.id))
    : recipes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleFilterChange = (newFilters: any) => {
    setFilters({
      ...filters,
      ...newFilters,
      page: 0,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
      <aside className="order-last lg:order-first">
        <AdvancedRecipeFilter
          onFilterChange={handleFilterChange}
          onSearchResult={(ids) => setSearchedIds(ids)}
        />
      </aside>

      <main>
        <RecipeBreadcrumbBar />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading || isFetching ? (
            <div className="col-span-full flex justify-center items-center min-h-120">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredRecipes.length === 0 ? (
            <p className="col-span-full text-center text-muted-foreground">
              Không tìm thấy công thức nào.
            </p>
          ) : (
            filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="transform transition-all duration-300 hover:scale-105"
              >
                <RecipeItem
                  recipe={recipe}
                  ratingCount={10}
                  // isFavorite={false}
                />
              </div>
            ))
          )}
        </div>

        {recipes.length > 0 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: prev.page - 1 }))
              }
              disabled={filters.page === 0}
              className="px-4 py-2 bg-white border border-stroke/20 text-headline rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-auto"
            >
              Trang trước
            </button>
            <span className="text-sm text-headline font-medium">
              Trang <strong>{filters.page + 1}</strong> / {totalPages}
            </span>
            <button
              onClick={() =>
                setFilters((prev) => ({ ...prev, page: prev.page + 1 }))
              }
              disabled={filters.page + 1 >= totalPages}
              className="px-4 py-2 bg-white border border-stroke/20 text-headline rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-auto"
            >
              Trang sau
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default RecipePage;
