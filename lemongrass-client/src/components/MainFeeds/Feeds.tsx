import { useFeed } from "@/hooks/useFeed";
import { isRecipeFeedItem } from "@/types/feed/type-guards";
import type { RecipeFeedItem } from "@/types/feed/RecipeFeedItem";
import RecipeItemCard from "./Feed/RecipeItemCard";
import { useFeedContext } from "@/contexts/feedContext";
import { useEffect } from "react";

type Props = {
  className?: string;
};

export const FeedPage = ({ className }: Props) => {
  const { data: feeds, loading } = useFeed();
  const { feeds: prevFeeds, setFeeds } = useFeedContext();

  useEffect(() => {
    if (feeds && JSON.stringify(prevFeeds) !== JSON.stringify(feeds)) {
      setFeeds(feeds);
    }
  }, [feeds, prevFeeds, setFeeds]);

  console.log(feeds);

  return (
    <div className={`${className}`}>
      <div className="flex flex-col gap-2 h-full">
        {loading ? (
          <p>Loading feeds...</p>
        ) : (
          feeds?.map((feed) => {
            if (isRecipeFeedItem(feed)) {
              const recipe = feed as RecipeFeedItem;
              return <RecipeItemCard key={feed.id} recipe={recipe} />;
            }
            return null;
          })
        )}
      </div>
      {/* <button onClick={refetch}>Reload</button> */}
    </div>
  );
};
