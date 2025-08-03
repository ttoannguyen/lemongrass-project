// src/hooks/useSubmitPost.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postService } from "@/services/post/post.service";
import type { PostCreate } from "@/types/post/PostCreate";

export const useSubmitPost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: PostCreate) => {
      console.log(payload);
      return await postService.createPost(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds", "posts"] });
    },
  });

  return mutation;
};
