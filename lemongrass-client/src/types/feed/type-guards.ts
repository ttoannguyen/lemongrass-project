import type { FeedItem } from "./FeedItem";
import type { PostFeedItem } from "./PostFeedItem";
import type { RecipeFeedItem } from "./RecipeFeedItem";

export function isPostFeedItem(feed: FeedItem): feed is PostFeedItem {
  return feed.type === "POST";
}

export function isRecipeFeedItem(feed: FeedItem): feed is RecipeFeedItem {
  return feed.type === "RECIPE";
}
