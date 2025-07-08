import { useQuery } from "@tanstack/react-query";
import { feedsService } from "@/services/feeds.service";
// import { ingredientService } from "@/services/ingredient.service";
// import { unitService } from "@/services/ingredientUnit.service";

export const PreloadAppData = ({ children }: { children: React.ReactNode }) => {
  useQuery({
    queryKey: ["feeds"],
    queryFn: feedsService.getFeeds,
    staleTime: 300_000,
  });

  return <>{children}</>;
};
