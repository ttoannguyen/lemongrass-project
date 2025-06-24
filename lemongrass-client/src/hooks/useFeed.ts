// hooks/useFeed.ts
import { useApi } from "./useApi";
import { feedsService } from "@/services/feeds.service";
import type { FeedItem } from "@/types/feed/FeedItem";

export const useFeed = () => {
  return useApi<FeedItem[]>(feedsService.getFeeds);
};
