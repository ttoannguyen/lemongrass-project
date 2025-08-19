import { commentService } from "@/services/comment/comment.service";
import type { CreateComment } from "@/types/comment/CreateComment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCommentRecipeMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (comment: CreateComment) =>
      commentService.createComment(comment),
    onSuccess: ( variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.recipeId],
      });
    },
  });
};

export const useGetCommentRecipeId = (id: string) => {
  return useQuery({
    queryKey: ["comments", id],
    queryFn: () => commentService.getCommentRecipeId(id),
    staleTime: 1 * 60 * 1000,
  });
};


export const useDeleteCommentRecipeMutation = (recipeId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) => commentService.deleteComment(commentId),
    onSuccess: () => {
      // Làm mới danh sách comment của recipe
      queryClient.invalidateQueries({ queryKey: ["comments", recipeId] });
    },
  });
};