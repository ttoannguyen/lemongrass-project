import PostCard from "@/components/community/PostCard";
import { useState } from "react";
import PostComposer from "@/components/community/PostComposer";
import { Button } from "@/components/ui/button";
import { usePostsQuery } from "@/hooks/queries/useInfinitePostsQuery";

const FeedPage = () => {
  const [page, setPage] = useState(0);
  const size = 6;

  const { data, isLoading, isError, error, isFetching } = usePostsQuery(page, size);

  const posts = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  if (isLoading) {
    return <p className="text-center py-6 text-lg font-medium">⏳ Đang tải...</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-6 text-red-500 font-semibold">
        ❌ Lỗi: {error instanceof Error ? error.message : "Không thể tải bài viết"}
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">
      {/* Composer */}
      <div className="mb-6">
        <PostComposer />
      </div>

      {/* Grid Feed */}
      {posts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <PostCard key={`${post.id}-${index}`} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-center py-10 text-gray-500">Chưa có bài viết nào.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 py-8">
        <Button
          variant="outline"
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          disabled={page === 0 || isFetching}
        >
          ← Trang trước
        </Button>

        <span className="px-3 py-1 rounded bg-muted text-sm font-medium">
          Trang {page + 1} / {totalPages}
        </span>

        <Button
          variant="outline"
          onClick={() => setPage((p) => (p + 1 < totalPages ? p + 1 : p))}
          disabled={page + 1 >= totalPages || isFetching}
        >
          Trang sau →
        </Button>
      </div>
    </div>
  );
};

export default FeedPage;
