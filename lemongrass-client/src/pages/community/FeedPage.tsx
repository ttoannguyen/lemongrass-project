import Masonry from "react-masonry-css";
import PostCard from "@/components/community/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { useInfinitePostsQuery } from "@/hooks/queries/useInfinitePostsQuery";
import { useMemo } from "react";
import PostComposer from "@/components/community/PostComposer";

const FeedPage = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isError,
    error,
  } = useInfinitePostsQuery();

  const posts = useMemo(() => {
    const allPosts = data?.pages.flatMap((page, pageIndex) =>
      page.content.map((post) => ({ ...post, pageIndex }))
    ) ?? [];
    // Log to check for duplicates
    const postIds = allPosts.map((post) => post.id);
    const uniqueIds = new Set(postIds);
    if (postIds.length !== uniqueIds.size) {
      console.warn("Duplicate post IDs detected:", postIds);
    }
    return allPosts;
  }, [data]);

  const defaultCols = useMemo(() => 4, []); // Fixed for consistency

  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  if (isLoading) {
    return <p className="text-center py-4">Đang tải...</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-4 text-red-500">
        Lỗi: {error instanceof Error ? error.message : "Không thể tải bài viết"}
      </p>
    );
  }

  return (
    <div>
      <PostComposer />
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchNextPage}
        hasMore={!!hasNextPage}
        loader={<p className="text-center py-4">Đang tải...</p>}
        endMessage={<p className="text-center py-4">Hết bài viết</p>}
      >
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex gap-0"
          columnClassName="bg-transparent space-y-0"
        >
          {posts.map((post, index) => (
            <PostCard
              key={`${post.id}-${post.pageIndex}-${index}`} // Ensure unique key
              post={post}
            />
          ))}
        </Masonry>
      </InfiniteScroll>
    </div>
  );
};

export default FeedPage;