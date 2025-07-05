import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import { recipeService } from "@/services/recipe/recipe.service";

const RecipeDetailPage = () => {
  const { recipeId } = useParams();
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!recipeId) return;

    setProgress(10);

    const fetchRecipe = async () => {
      try {
        setProgress(30);
        const res = await recipeService.getRecipeById(recipeId);
        console.log(res);
        setProgress(50);
        setRecipe(res);
        setProgress(100);
        setTimeout(() => {
          setProgress(0);
        }, 200);
      } catch (err) {
        console.error("Failed to fetch recipe", err);
        setProgress(0);
      }
    };

    fetchRecipe();
  }, [recipeId]);

  return (
    <div className="relative">
      {progress > 0 && (
        <div className="fixed top-[-1px] left-0 right-0 z-50">
          <Progress
            value={progress}
            className="relative w-full h-1 bg-yellow-400 "
          />
        </div>
      )}

      <div className="pt-4 max-w-3xl mx-auto p-4">
        {!recipe ? (
          <p className="text-center">Loading recipe...</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">{recipe.title}</h1>

            <h2 className="text-lg font-semibold mb-2">Ingredients:</h2>
            <ul className="list-disc list-inside mb-4">
              {recipe.ingredients?.map((ing, index) => (
                <li key={index}>
                  {ing.name} - {ing.quantity}
                </li>
              ))}
            </ul>

            <h2 className="text-lg font-semibold mb-2">Instructions:</h2>
            <ol className="list-decimal list-inside">
              {recipe.instructions?.map((step, index) => (
                <li key={index}>{step.description}</li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
};

export default RecipeDetailPage;
