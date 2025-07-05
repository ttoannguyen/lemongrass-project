import { isPostFeedItem, isRecipeFeedItem } from "@/types/feed/type-guards";
import type { RecipeFeedItem } from "@/types/feed/RecipeFeedItem";
// import RecipeItemCard from "./Recipes/RecipeItemCard";
import type { FeedItem } from "@/types/feed/FeedItem";
import { useFeedContext } from "@/contexts/FeedContext";
import type { PostFeedItem } from "@/types/feed/PostFeedItem";
import PostItemCard from "./Posts/PostItemCard";
import RecipeItemCard from "./Feed/RecipeItemCard";
// import { PhotoProvider } from "react-photo-view";

type Props = {
  className?: string;
};

export const FeedPage = ({ className }: Props) => {
  const { feeds, loading, error } = useFeedContext();

  if (loading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>Lỗi: {error.message}</p>;

  return (
    <div className={className}>
      <div className="flex flex-col gap-2">
        {feeds?.map((feed: FeedItem) => {
          if (isRecipeFeedItem(feed)) {
            const recipe = feed as RecipeFeedItem;
            return <RecipeItemCard key={feed.id} recipe={recipe} />;
          }
          if (isPostFeedItem(feed)) {
            const post = feed as PostFeedItem;
            return <PostItemCard key={feed.id} post={post} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};
