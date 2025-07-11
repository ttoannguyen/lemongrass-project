// providers/PreloadUserData.tsx
import { useQuery } from "@tanstack/react-query";
import { recipeService } from "@/services/recipe/recipe.service";
import { useAuth } from "@/contexts/AuthContext";
import { savedRecipeService } from "@/services/savedRecipe/saved.recipe.service";

export const PreloadUserData = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoggedIn } = useAuth();

  useQuery({
    queryKey: ["my-recipe"],
    queryFn: recipeService.getMyRecipes,
    staleTime: 5 * 60 * 1000,
    enabled: isLoggedIn,
  });

  useQuery({
    queryKey: ["saved-recipe"],
    queryFn: savedRecipeService.getsavedRecipes,
    staleTime: 5 * 60 * 1000,
    enabled: isLoggedIn,
  });

  return <>{children}</>;
};
