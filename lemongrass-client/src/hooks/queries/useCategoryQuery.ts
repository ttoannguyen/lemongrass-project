import { categoryService } from "@/services/category/category.service";
import type { CategoryDto } from "@/types/category/CategoryDto";
import { useQuery } from "@tanstack/react-query";

export const useCategoryQuery = () => {
  return useQuery<CategoryDto[]>({
    queryKey: ["categories"],
    queryFn: categoryService.getCategories,
    staleTime: 5 * 60 * 1000,
  });
};
