// hooks/useInfinitePostsQuery.ts
import { postService } from "@/services/post/post.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfinitePostsQuery = (keyword?: string) => {
  return useInfiniteQuery({
    queryKey: ["posts", "feeds", keyword],
    queryFn: ({ pageParam = 0 }) =>
      postService.getPosts({ page: pageParam, size: 2, keyword }),
    getNextPageParam: (lastPage) =>
      {  console.log(lastPage)
      return lastPage.last ? undefined : lastPage.pageNumber + 1},
    initialPageParam: 0,
  });
};
