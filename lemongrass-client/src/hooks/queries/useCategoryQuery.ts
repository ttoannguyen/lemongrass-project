import { useQuery } from "@tanstack/react-query";
import { categoryService } from "@/services/category/category.service";
import type { CategoryResponse } from "@/types/category/CategoryResponse";

export const useCategoryQuery = () => {
  return useQuery<CategoryResponse[]>({
    queryKey: ["categories"],
    queryFn: categoryService.getCategories,
    staleTime: 5 * 60 * 1000, // 5 phút
  });
};
