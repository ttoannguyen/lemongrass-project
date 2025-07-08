// providers/PreloadAppData.tsx

import { useQuery } from "@tanstack/react-query";
import { feedsService } from "@/services/feeds.service";
import { categoryService } from "@/services/category/category.service";
export const PreloadAppData = ({ children }: { children: React.ReactNode }) => {
  useQuery({
    queryKey: ["feeds"],
    queryFn: feedsService.getFeeds,
    staleTime: 300_000,
  });

  useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getCategories,
    staleTime: 300_000,
  });

  return <>{children}</>;
};
