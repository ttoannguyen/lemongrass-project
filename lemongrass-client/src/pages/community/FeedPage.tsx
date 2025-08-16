import Masonry from "react-masonry-css";
import PostCard from "@/components/community/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfinitePostsQuery } from "@/hooks/queries/useInfinitePostsQuery";
import { useMemo } from "react";

const FeedPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    // isFetchingNextPage,
    isLoading,
  } = useInfinitePostsQuery();

  const posts = data?.pages.flatMap((page) => page.content) ?? [];

  // Random cột 4 hoặc 5 mỗi lần render
  const defaultCols = useMemo(() => Math.random() > 0.5 ? 4 : 5, []);
  
  const breakpointColumnsObj = {
    default: defaultCols,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (isLoading) {
    return <p className="text-center py-4">Đang tải...</p>;
  }

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<p className="text-center py-4">Đang tải...</p>}
      endMessage={<p className="text-center py-4">Hết bài viết</p>}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-0" // không khoảng cách giữa cột
        columnClassName="bg-transparent space-y-0" // không khoảng cách dọc
      >
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Masonry>
    </InfiniteScroll>
  );
};

export default FeedPage;
