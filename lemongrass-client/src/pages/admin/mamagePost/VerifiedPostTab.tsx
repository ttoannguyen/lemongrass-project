"use client";

import { usePostsQuery } from "@/hooks/queries/usePostQuery";
import PostList from "./PostList";

const VerifiedPostTab = () => {
  const { data: posts = [], isLoading } = usePostsQuery();
  const verified = posts.filter((p) => p.isVerified);

  return (
    <div>
      <h2 className="font-medium text-lg mb-2">Bài viết đã duyệt</h2>
      <PostList posts={verified} loading={isLoading} />
    </div>
  );
};

export default VerifiedPostTab;
