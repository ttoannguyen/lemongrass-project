import FeedImageTemplate from "@/components/imageTempale/FeedImageTemplate";
import AuthorHoverCard from "@/components/Profile/AuthorHoverCard";
import { SaveRecipeButton } from "@/components/ui/save-recipe-button-props";
import { useAuth } from "@/contexts/AuthContext";
import type { RecipeFeedItem } from "@/types/feed/RecipeFeedItem";
import { Link } from "react-router-dom";

type Props = {
  recipe: RecipeFeedItem;
  savedList: Set<string>;
};

const RecipeItemCard = ({ recipe, savedList }: Props) => {
  const { isLoggedIn } = useAuth();
  const isSaved = savedList.has(recipe.id);
  return (
    <div className="shadow max-w-2xl mt-2 w-full mx-auto overflow-hidden max-h-[500px] flex flex-col">
      <div className="h-[200px] w-full shrink-0 relative z-0">
        <FeedImageTemplate image={recipe.imageResponses} />
      </div>

      <div className="p-4 ">
        <AuthorHoverCard
          author={recipe.accountShortResponse!}
          createdAt={recipe.createAt}
        />
        <Link to={`/recipe/${recipe.id}`}>
          <p className="text-lg font-semibold mb-2 hover:text-green-500">
            {recipe.title}
          </p>
        </Link>
        <div className="flex justify-between">
          <p className="text-sm text-gray-600">
            {recipe.tags?.map((tag) => (
              <span key={tag.name} className="mr-2">
                #{tag.name}
              </span>
            ))}
          </p>
          {isLoggedIn && (
            <SaveRecipeButton recipeId={recipe.id} isSaved={isSaved} />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeItemCard;
