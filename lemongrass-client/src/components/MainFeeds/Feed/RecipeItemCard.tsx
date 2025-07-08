import FeedImageTemplate from "@/components/imageTempale/FeedImageTemplate";
import type { RecipeFeedItem } from "@/types/feed/RecipeFeedItem";
import { Link } from "react-router-dom";

type Props = {
  recipe: RecipeFeedItem;
};

const RecipeItemCard = ({ recipe }: Props) => {
  // console.log("In recipe item card: ", recipe);
  return (
    <div className="border p-4 m-5 rounded shadow max-w-2xl w-full mx-auto">
      <Link to={`/recipe/${recipe.id}`} className="text-lg font-semibold ">
        <div className="hover:underline">{recipe.title}</div>
        {recipe.ingredients.map((ige) => (
          <div key={ige.name}>
            <p>{ige.name}</p>
            <p>{ige.quantity}</p>
          </div>
        ))}
      </Link>
      <p className="text-sm text-gray-500">
        {recipe.category?.map((category) => (
          <span key={category.name} className="mr-2">
            {category.name}
          </span>
        ))}
      </p>
      <p>
        {recipe.tags?.map((tag) => (
          <span key={tag.name} className="mr-2">
            #{tag.name}
          </span>
        ))}
      </p>
      <Link to={`/recipe/${recipe.id}`}>
        <FeedImageTemplate image={recipe.imageResponses} />
      </Link>
    </div>
  );
};

export default RecipeItemCard;
