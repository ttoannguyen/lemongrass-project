import { createContext, useContext, useState } from "react";
import type { FeedItem } from "@/types/feed/FeedItem";

type FeedContextType = {
  feeds: FeedItem[] | null;
  setFeeds: (feeds: FeedItem[]) => void;
};

const FeedContext = createContext<FeedContextType | undefined>(undefined);

export const FeedProvider = ({ children }: { children: React.ReactNode }) => {
  const [feeds, setFeeds] = useState<FeedItem[] | null>(null);

  return (
    <FeedContext.Provider value={{ feeds, setFeeds }}>
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
