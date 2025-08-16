// hooks/useSubmitPost.ts
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/post/post.service";
import type { PostResponse } from "@/types/post/PostResponse";
import { useAuth } from "@/contexts/AuthContext";
import type { PagedResponse } from "@/types/PagedResponse";

// export const usePostsQuery = () => {
//   return useQuery<PostResponse[]>({
//     queryKey: ["posts", "feeds"],
//     queryFn: postService.getPosts,
//     staleTime: 5 * 60 * 1000,
//   });
// };
export const usePostsQuery = (page = 0, size = 10, keyword?: string) => {
  return useQuery<PagedResponse<PostResponse>>({
    queryKey: ["posts", "feeds", page, size, keyword],
    queryFn: () => postService.getPosts({page, size, keyword}),
    staleTime: 5 * 60 * 1000,
  });
};

export const useAccountPostsQuery = (id?: string) => {
  const { isLoggedIn } = useAuth();
  return useQuery<PostResponse[]>({
    queryKey: ["posts", id],
    queryFn: () => postService.getAccountPost(id!),
    enabled: !!id && isLoggedIn,
    staleTime: 5 * 60 * 1000,
  });
};

