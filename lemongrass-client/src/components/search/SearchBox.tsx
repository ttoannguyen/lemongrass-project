import { useState } from "react";
import { recipeSearchService } from "@/services/search/search.service";
import { useAutocomplete } from "@/hooks/queries/useAutocomplete";
import type { RecipeSuggestion } from "@/types/search/RecipeSuggest.type";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import { Link } from "react-router-dom";

type Props = {
  onSearchResult?: (recipes: RecipeResponse[]) => void;
};

export function RecipeSearchBox({ onSearchResult }: Props) {
  const [keyword, setKeyword] = useState("");
  const { data = [] } = useAutocomplete(keyword);
  const suggestions = data as RecipeSuggestion[];
  console.log(suggestions)
  console.log()
  const handleSearch = async () => {
    const recipe = await recipeSearchService.searchRecipes({ keyword });
    onSearchResult?.(recipe);
  };

  return (
    <div className="relative w-full ">
      {/* Input + Button */}
      <div className="flex gap-2">
        <input
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm món ăn..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary shadow-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-button hover:bg-button/90 text-white px-4 py-2 rounded-lg text-sm transition-shadow cursor-pointer shadow"
        >
          Tìm
        </button>
      </div>

      {/* Suggestion list */}
      {suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-100  divide-y divide-gray-100">
          {suggestions.map((s, index) => {
            const highlights = [
              ...(s.highlight?.["title.suggest"] ?? []),
              
            ];

            return (
              <Link to={`/recipe/${s.id}`}
                key={index}
                className="px-4 w-full h-10 py-2  cursor-pointer text-sm transition-colors"
              >
                {highlights.length > 0 ? (
                  highlights.map((h, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: h }} />
                  ))
                ) : (
                  <span>{s.title}</span>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
