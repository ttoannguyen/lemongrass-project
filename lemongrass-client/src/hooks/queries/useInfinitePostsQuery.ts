import { postService } from "@/services/post/post.service";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfinitePostsQuery = (keyword?: string) => {
  return useInfiniteQuery({
    queryKey: ["posts", "feeds", keyword],
    queryFn: async ({ pageParam = 0 }) => {
      console.log("Fetching page:", pageParam);
      const response = await postService.getPosts({ page: pageParam, size: 2, keyword });
      console.log("Response:", response);
      return response;
    },
    getNextPageParam: (lastPage) => {
      console.log("Last page:", lastPage);
      if (lastPage.last) {
        return undefined;
      }
      const pageNumber = Number(lastPage.pageNumber) || 0;
      console.log("Next page:", pageNumber + 1);
      return pageNumber + 1;
    },
    initialPageParam: 0,
  });
};