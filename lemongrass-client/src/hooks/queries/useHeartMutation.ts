import { reactionService } from "@/services/reaction/reaction.service";
import { savedRecipeService } from "@/services/savedRecipe/saved.recipe.service";
import type { ReactionRequest } from "@/types/reaction/like.type";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useSavedRecipesQuery = () => {
  return useQuery<RecipeResponse[]>({
    queryKey: ["saved-recipes"],
    queryFn: () => savedRecipeService.getsavedRecipes(),
    staleTime: 5 * 60 * 1000,
  });
};

export const useSaveRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: string) => savedRecipeService.save(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-recipes"] });
    },
  });
};

export const useUnsaveRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: string) => savedRecipeService.unsave(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-recipes"] });
    },
  });
};

export const useHeartMutation = () => {
  //   const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ReactionRequest) => reactionService.likePost(payload),
  });
};

export const useLikedPostIdsQuery = () =>
  useQuery({
    queryKey: ["liked-post-ids"],
    queryFn: () => reactionService.getLikedPostIds(),
    staleTime: 1000 * 60 * 5,
  });

export const useLikedRecipeIdsQuery = () =>
  useQuery({
    queryKey: ["liked-recipe-ids"],
    queryFn: () => reactionService.getLikedRecipeIds(),
    staleTime: 1000 * 60 * 5,
  });

export const useToggleHeartPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: string) => reactionService.toggleHeartPost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["liked-post-ids"] });
    },
  });
};

export const useToggleHeartRecipeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (recipeId: string) =>
      reactionService.toggleHeartRecipe(recipeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["liked-recipe-ids"] });
    },
  });
};
