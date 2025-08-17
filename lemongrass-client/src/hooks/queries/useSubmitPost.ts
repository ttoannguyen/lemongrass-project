import { useMutation, useQueryClient } from "@tanstack/react-query";

import type { PostCreate } from "@/types/post/PostCreate";
import { toast } from "sonner";
import { postService } from "@/services/post/post.service";

export const useSubmitPost = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: PostCreate) => {
      const result = await postService.createPost(payload);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feeds", "posts"] });
      toast("Đăng bài viết thành công!");
    },
    onError: (error) => {
      const errorMessage =
        error instanceof Error ? error.message : "Lỗi không xác định";
      toast(`Lỗi khi tạo bài viết: ${errorMessage}`);
    },
    
  });

  return mutation;
};
