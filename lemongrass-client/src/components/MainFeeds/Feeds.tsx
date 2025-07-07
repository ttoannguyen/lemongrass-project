import { isPostFeedItem, isRecipeFeedItem } from "@/types/feed/type-guards";
import type { RecipeFeedItem } from "@/types/feed/RecipeFeedItem";
import type { FeedItem } from "@/types/feed/FeedItem";
import { useFeedContext } from "@/contexts/FeedContext";
import type { PostFeedItem } from "@/types/feed/PostFeedItem";
import PostItemCard from "./Posts/PostItemCard";
import RecipeItemCard from "./Feed/RecipeItemCard";

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
            console.log("In feed - recipe: ", [feed.id, recipe]);
            return <RecipeItemCard key={feed.id} recipe={recipe} />;
          }
          if (isPostFeedItem(feed)) {
            const post = feed as PostFeedItem;
            console.log("In feed - post: ", [feed.id, post]);

            return <PostItemCard key={feed.id} post={post} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};
