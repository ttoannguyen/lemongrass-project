import type { RecipeFeedItem } from "@/types/feed/RecipeFeedItem";
import { Link, useNavigate } from "react-router-dom";

type Props = {
  recipe: RecipeFeedItem;
};

const RecipeItemCard = ({ recipe }: Props) => {
  return (
    <div className="border p-4 m-5 rounded shadow ">
      <Link to={"/recipe"} className="text-lg font-semibold ">
        {recipe.title}
        {recipe.ingredientShortResponses.map((ige) => (
          <div>
            <p>{ige.name}</p>
            <p>{ige.quatity}</p>
          </div>
        ))}
      </Link>
      <p className="text-sm text-gray-500">
        {recipe.category} • {recipe.difficulty}
      </p>
      <p>
        {recipe.tags?.map((tag) => (
          <span key={tag.name} className="mr-2">
            #{tag.name}
          </span>
        ))}
      </p>
    </div>
  );
};

export default RecipeItemCard;
