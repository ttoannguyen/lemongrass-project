// hooks/useSubmitRecipe.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/post/post.service";
import type { PostCreate } from "@/types/post/PostCreate";

export const useSubmitPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: PostCreate) => {
      const result = await postService.createPost(payload);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
  });
};
