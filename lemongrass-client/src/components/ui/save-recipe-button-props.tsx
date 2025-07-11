import { useMutation, useQueryClient } from "@tanstack/react-query";
import { savedRecipeService } from "@/services/savedRecipe/saved.recipe.service";
import { IoBookmark } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
interface SaveRecipeButtonProps {
  recipeId: string;
  isSaved: boolean;
}

export const SaveRecipeButton = ({
  recipeId,
  isSaved,
}: SaveRecipeButtonProps) => {
  const queryClient = useQueryClient();

  const toggleSave = useMutation({
    mutationFn: async () => {
      if (isSaved) {
        await savedRecipeService.unsave(recipeId);
        console.log("un saved");
      } else {
        await savedRecipeService.save(recipeId);
        console.log("saved");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved-recipe"] });
    },
  });

  return (
    <button
      onClick={() => toggleSave.mutate()}
      className="p-1 rounded hover:bg-gray-100 transition"
      title={isSaved ? "Unsave recipe" : "Save recipe"}
    >
      {!isSaved ? (
        <IoBookmarkOutline />
      ) : (
        <IoBookmark className="text-primary" />
      )}
    </button>
  );
};
