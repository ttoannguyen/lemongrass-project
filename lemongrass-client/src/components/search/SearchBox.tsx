// import { useState } from "react";
// import { recipeSearchService } from "@/services/search/search.service";
// import { useAutocomplete } from "@/hooks/queries/useAutocomplete";
// import type { RecipeSuggestion } from "@/types/search/RecipeSuggest.type";

// type Props = {
//   onSearchResult?: (ids: string[]) => void;
// };

// export function RecipeSearchBox({ onSearchResult }: Props) {
//   const [keyword, setKeyword] = useState("");
//   const { data = [] } = useAutocomplete(keyword);
//   const suggestions = data as RecipeSuggestion[];

//   console.log(suggestions);
//   const handleSearch = async () => {
//     const ids = await recipeSearchService.searchRecipes({ keyword });
//     onSearchResult?.(ids);
//   };

//   return (
//     <div className="relative w-full max-w-md mx-auto">
//       <div className="flex gap-2">
//         <input
//           value={keyword}
//           onChange={(e) => setKeyword(e.target.value)}
//           placeholder="Tìm món ăn..."
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
//         />
//         <button
//           onClick={handleSearch}
//           className="bg-button hover:bg-button/90 text-white px-4 py-2 rounded-lg text-sm transition"
//         >
//           Tìm
//         </button>
//       </div>

//       {suggestions.map((s, index) => {
//         const highlights = [
//           ...(s.highlight?.["title.suggest"] ?? []),
//           ...(s.highlight?.["ingredients.name.suggest"] ?? []),
//         ];

//         return (
//           <div
//             key={index}
//             className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
//           >
//             {highlights.length > 0 ? (
//               highlights.map((h, i) => (
//                 <div key={i} dangerouslySetInnerHTML={{ __html: h }} />
//               ))
//             ) : (
//               <span>{s.title}</span>
//             )}
//           </div>
//         );
//       })}
//     </div>
//   );
// }

import { useState } from "react";
import { recipeSearchService } from "@/services/search/search.service";
import { useAutocomplete } from "@/hooks/queries/useAutocomplete";
import type { RecipeSuggestion } from "@/types/search/RecipeSuggest.type";

type Props = {
  onSearchResult?: (ids: string[]) => void;
};

export function RecipeSearchBox({ onSearchResult }: Props) {
  const [keyword, setKeyword] = useState("");
  const { data = [] } = useAutocomplete(keyword);
  const suggestions = data as RecipeSuggestion[];
  console.log(suggestions)
  const handleSearch = async () => {
    const ids = await recipeSearchService.searchRecipes({ keyword });
    onSearchResult?.(ids);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
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
          className="bg-button hover:bg-button/90 text-white px-4 py-2 rounded-lg text-sm transition-shadow shadow"
        >
          Tìm
        </button>
      </div>

      {/* Suggestion list */}
      {suggestions.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto divide-y divide-gray-100">
          {suggestions.map((s, index) => {
            const highlights = [
              ...(s.highlight?.["title.suggest"] ?? []),
              ...(s.highlight?.["ingredients.name.suggest"] ?? []),
            ];

            return (
              <div
                key={index}
                className="px-4 py-2 hover:bg-gray-50 cursor-pointer text-sm transition-colors"
              >
                {highlights.length > 0 ? (
                  highlights.map((h, i) => (
                    <div key={i} dangerouslySetInnerHTML={{ __html: h }} />
                  ))
                ) : (
                  <span>{s.title}</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
