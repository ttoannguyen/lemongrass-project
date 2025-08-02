import PostComposer from "@/components/community/PostComposer";
import PostCard from "@/components/community/PostCard";
import { usePostsQuery } from "@/hooks/queries/usePostQuery";

const FeedPage = () => {
  const { data: posts = [] } = usePostsQuery();

  return (
    <div className="max-w-2xl mx-auto px-4 py-6 space-y-4">
      <PostComposer />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      {posts.length === 0 && (
        <p className="text-muted-foreground text-center">
          Không có bài viết nào.
        </p>
      )}
    </div>
  );
};

export default FeedPage;
