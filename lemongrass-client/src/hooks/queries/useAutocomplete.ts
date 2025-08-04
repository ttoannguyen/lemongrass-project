import { recipeSearchService } from "@/services/search/search.service";
import type { RecipeSuggestion } from "@/types/search/RecipeSuggest.type";
import { useQuery } from "@tanstack/react-query";

export const useAutocomplete = (keyword: string) => {
  return useQuery<RecipeSuggestion>({
    queryKey: ["recipe-autocomplete", keyword],
    queryFn: () => recipeSearchService.autocomplete(keyword),
    enabled: keyword.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};
