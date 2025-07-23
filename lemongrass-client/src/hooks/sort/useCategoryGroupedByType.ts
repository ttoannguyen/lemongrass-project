import type { CategoryResponse } from "@/types/category/CategoryResponse";
import { useCategoryQuery } from "../queries/useCategoryQuery";

export const useCategoryGroupedByType = () => {
  const { data = [], isLoading, error } = useCategoryQuery();

  const grouped = data.reduce<Record<string, CategoryResponse[]>>(
    (acc, category) => {
      if (!acc[category.type]) {
        acc[category.type] = [];
      }
      acc[category.type].push(category);
      return acc;
    },
    {}
  );

  return { grouped, isLoading, error };
};
