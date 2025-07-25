"use client";

import { Skeleton } from "@/components/ui/skeleton";
import PostCard from "./PostCard";
import type { PostResponse } from "@/types/post/PostResponse";

const PostList = ({
  posts,
  loading,
}: {
  posts: PostResponse[];
  loading: boolean;
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-24 rounded-md" />
        <Skeleton className="h-24 rounded-md" />
      </div>
    );
  }

  if (posts.length === 0) {
    return <p className="italic text-muted-foreground">Không có bài viết.</p>;
  }

  return (
    <div className="grid gap-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;
