// hooks/useSubmitPost.ts
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/post/post.service";
import type { PostResponse } from "@/types/post/PostResponse";

export const usePostsQuery = () => {
  return useQuery<PostResponse[]>({
    queryKey: ["posts"],
    queryFn: postService.getPosts,
    staleTime: 5 * 60 * 1000,
  });
};
