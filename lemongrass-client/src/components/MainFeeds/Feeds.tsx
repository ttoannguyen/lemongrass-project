import { useFeed } from "@/hooks/queries/useFeeds";
import type { FeedItem } from "@/types/feed/FeedItem";
import type { RecipeFeedItem } from "@/types/feed/RecipeFeedItem";
import { isPostFeedItem, isRecipeFeedItem } from "@/types/feed/type-guards";
import RecipeItemCard from "./Feed/RecipeItemCard";
import type { PostFeedItem } from "@/types/feed/PostFeedItem";
import PostItemCard from "./Posts/PostItemCard";
import { MiniPostComposer } from "../Posts/MiniPostComposer";
// import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";

type Props = {
  className?: string;
};

export const FeedPage = ({ className }: Props) => {
  const { data: feeds, isLoading, error: feedError } = useFeed();
  // const { data: categories, error: categoryError } = useCategoryQuery();
  // console.log(categories, categoryError);
  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (feedError) return <p>Lỗi: {feedError.message}</p>;

  return (
    <div className={className}>
      <MiniPostComposer />
      <div className="flex flex-col gap-2">
        {feeds?.map((feed: FeedItem) => {
          if (isRecipeFeedItem(feed)) {
            const recipe = feed as RecipeFeedItem;
            // console.log("In feed - recipe: ", [feed.id, recipe]);
            return <RecipeItemCard key={feed.id} recipe={recipe} />;
          }
          if (isPostFeedItem(feed)) {
            const post = feed as PostFeedItem;
            // console.log("In feed - post: ", [feed.id, post]);

            return <PostItemCard key={feed.id} post={post} />;
          }
          return null;
        })}
      </div>
    </div>
  );
};
