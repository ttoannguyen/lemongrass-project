import MealTypeSelector from "@/components/Recipes/MealTypeSelector";
import RecipeItem from "@/components/Recipes/RecipeItem";
import { useRecipesQuery } from "@/hooks/queries/useRecipeQuery";

const RecipePage = () => {
  const { data: recipes = [] } = useRecipesQuery();

  return (
    <div className="mx-auto  p-2 ">
      <MealTypeSelector />
      <div className="flex gap-4 mt-4 px-4 ">
        {recipes.map((recipe) => (
          <div className="w-60">
            <RecipeItem
              key={recipe.id}
              recipe={recipe}
              ratingCount={10}
              isFavorite={false}
            />
          </div>
        ))}
        {recipes.map((recipe) => (
          <div className="w-60">
            <RecipeItem
              key={recipe.id}
              recipe={recipe}
              ratingCount={10}
              isFavorite={false}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipePage;
