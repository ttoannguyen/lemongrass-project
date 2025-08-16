// providers/PreloadPublicData.tsx
import { useQuery } from "@tanstack/react-query";
// import { feedsService } from "@/services/feeds.service";
import { categoryService } from "@/services/category/category.service";

export const PreloadPublicData = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // useQuery({
  //   queryKey: ["feeds"],
  //   queryFn: feedsService.getFeeds,
  //   staleTime: 5 * 60 * 1000,
  // });

  useQuery({
    queryKey: ["categories"],
    queryFn: categoryService.getCategories,
    staleTime: 5 * 60 * 1000,
  });

  return <>{children}</>;
};
