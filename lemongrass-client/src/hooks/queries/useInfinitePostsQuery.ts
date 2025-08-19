import { postService } from "@/services/post/post.service";
import type { PagedResponse } from "@/types/PagedResponse";
import type { PostResponse } from "@/types/post/PostResponse";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export const useInfinitePostsQuery = (keyword?: string) => {
  return useInfiniteQuery({
    queryKey: ["posts", "feeds", keyword],
    queryFn: async ({ pageParam = 0 }) => {
      console.log("Fetching page:", pageParam);
      const response = await postService.getPosts({
        page: pageParam,
        size: 2,
        keyword,
      });
      console.log("Response:", response);
      return response;
    },
    getNextPageParam: (lastPage) => {
      const pageNumber = lastPage.pageNumber ?? 0;
      if (pageNumber + 1 >= lastPage.totalPages) {
        return undefined; // hết trang
      }
      return pageNumber + 1;
    },
    initialPageParam: 0,
  });


};


export const usePostsQuery = (page: number, size: number, keyword?: string) => {
  return useQuery<PagedResponse<PostResponse>, Error>({
    queryKey: ["posts", "feeds", page, size, keyword],
    queryFn: async () => {
      const response = await postService.getPosts({ page, size, keyword });
      return response;
    },
    placeholderData: (prev) => prev, // tương tự keepPreviousData ở v4
  });
};

