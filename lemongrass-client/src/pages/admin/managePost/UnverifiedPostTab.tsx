"use client";

import { usePostsQuery } from "@/hooks/queries/usePostQuery";
import PostList from "./PostList";

const UnverifiedPostTab = () => {
  const { data: posts = [], isLoading } = usePostsQuery();
  const unverified = posts.filter((p) => !p.isVerified);

  return (
    <div>
      <h2 className="font-medium text-lg mb-2">Bài viết chưa duyệt</h2>
      <PostList posts={unverified} loading={isLoading} />
    </div>
  );
};

export default UnverifiedPostTab;
