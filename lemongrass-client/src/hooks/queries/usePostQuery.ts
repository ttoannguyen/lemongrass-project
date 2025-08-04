// hooks/useSubmitPost.ts
import { useQuery } from "@tanstack/react-query";
import { postService } from "@/services/post/post.service";
import type { PostResponse } from "@/types/post/PostResponse";
import { useAuth } from "@/contexts/AuthContext";

export const usePostsQuery = () => {
  return useQuery<PostResponse[]>({
    queryKey: ["posts", "feeds"],
    queryFn: postService.getPosts,
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

