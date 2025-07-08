// hooks/queries/useFeedQuery.ts
import { useQuery } from "@tanstack/react-query";
import { feedsService } from "@/services/feeds.service";
import type { FeedItem } from "@/types/feed/FeedItem";

export const useFeed = () => {
  return useQuery<FeedItem[]>({
    queryKey: ["feeds"],
    queryFn: feedsService.getFeeds,
    staleTime: 5 * 60 * 1000, // giữ cache trong 5 phút
  });
};
