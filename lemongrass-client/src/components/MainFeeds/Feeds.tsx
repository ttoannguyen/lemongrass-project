import { useFeed } from "@/hooks/useFeed";
import { isRecipeFeedItem } from "@/types/feed/type-guards";
import type { RecipeFeedItem } from "@/types/feed/RecipeFeedItem";
import RecipeItemCard from "./Feed/RecipeItemCard";

type Props = {
  className?: string;
};

export const FeedPage = ({ className }: Props) => {
  const { data: feeds, loading, error, refetch } = useFeed();

  if (loading) return <p>Loading feeds...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.log(feeds);
  return (
    <div className={`${className}`}>
      <div className="flex flex-col gap-2">
        {feeds?.map((feed) => {
          if (isRecipeFeedItem(feed)) {
            const recipe = feed as RecipeFeedItem;
            return <RecipeItemCard key={feed.id} recipe={recipe} />;
          }
          return null;
        })}
      </div>
      <button onClick={refetch}>Reload</button>
    </div>
  );
};
