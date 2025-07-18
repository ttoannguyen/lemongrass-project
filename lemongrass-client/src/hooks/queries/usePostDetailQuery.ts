import { postService } from "@/services/post/post.service";
import type { PostResponse } from "@/types/post/PostResponse";
import { useQuery } from "@tanstack/react-query";

export const usePostDetail = (id: string) => {
  return useQuery<PostResponse>({
    queryKey: ["post", id],
    queryFn: () => postService.getPostById(id),
    staleTime: 300_000,
  });
};
