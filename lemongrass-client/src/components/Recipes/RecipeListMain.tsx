import RecipeItemMain from "./RecipeItemMain";
import { useRecipesQuery } from "@/hooks/queries/useRecipeQuery";

const RecipeListMain = () => {
  const { data: recipes = [], isLoading } = useRecipesQuery();

  if (isLoading) {
    return <div className="p-4">Loading...</div>;
  }
  return (
    <>
      <>hello</>
      <div className="px-4 py-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeItemMain
            key={recipe.id}
            recipe={recipe}
            ratingCount={10}
            isFavorite={false}
          />
        ))}
      </div>
    </>
  );
};

export default RecipeListMain;
