import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { FeedItem } from "@/types/feed/FeedItem";
import { feedsService } from "@/services/feeds.service";

type FeedContextType = {
  feeds: FeedItem[] | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider = ({ children }: { children: React.ReactNode }) => {
  const [feeds, setFeeds] = useState<FeedItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchFeeds = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await feedsService.getFeeds();
      console.log("In feedcontext: ", result);
      setFeeds(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFeeds();
  }, [fetchFeeds]);

  return (
    <FeedContext.Provider
      value={{ feeds, loading, error, refetch: fetchFeeds }}
    >
      {children}
    </FeedContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFeedContext = () => {
  const context = useContext(FeedContext);
  if (!context) {
    throw new Error("useFeedContext must be used within a FeedProvider");
  }
  return context;
};
