import type { PostFeedItem } from "./PostFeedItem";
import type { RecipeFeedItem } from "./RecipeFeedItem";

export type FeedType = "POST" | "RECIPE";
export type FeedItem = PostFeedItem | RecipeFeedItem;

export interface FeedResponse {
  code: number;
  result: FeedItem[];
}
