// hooks/useSubmitPost.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postService } from "@/services/post/post.service";

export const useSubmitPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (formData: FormData) => {
      return await postService.createPost(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds"] });
    },
  });
};
