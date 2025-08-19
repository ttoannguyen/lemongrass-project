import { Link } from "react-router-dom";
import { Heart, Hourglass } from "lucide-react";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import { cn } from "@/lib/utils";

import { Stars } from "@/components/icons/StarComponent";
import { AspectRatio } from "../ui/aspect-ratio";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";
import {
  useLikedRecipeIdsQuery,
  useToggleHeartRecipeMutation,
} from "@/hooks/queries/useHeartMutation";

type RecipeItemMainProps = {
  recipe: RecipeResponse;
  className?: string;
  ratingCount?: number;
};

export function RecipeItem({ recipe }: RecipeItemMainProps) {
  const { t } = useTranslation();
  const imageUrl = recipe.images?.[0]?.url ?? "";
  const minutes = recipe.cookingTime ?? 0;
  const categories = recipe.categories;
  const { data: likedIds = [], refetch } = useLikedRecipeIdsQuery();
  const toggleHeart = useToggleHeartRecipeMutation();

  const rate = recipe.ratingAvg == null ? 0 : recipe.ratingAvg;
  const isLiked = likedIds.includes(recipe.id);
  const handleClick = (recipeId: string) => {
    toggleHeart.mutate(recipeId);
    refetch();
  };

  return (
    <div className="group flex md:flex-col bg-white md:h-85 md:w-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow">
      <AspectRatio ratio={16 / 9}>
        <Link to={`/recipe/${recipe.id}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={recipe.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-104"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center h-full w-full bg-gray-100 text-sm text-gray-500">
              No image
            </div>
          )}
        </Link>
        <button
          type="button"
          onClick={() => handleClick(recipe.id)}
          aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
          className={cn(
            "absolute top-2 right-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-white shadow transition",
            isLiked ? "text-tertiary" : "text-paragraph hover:text-tertiary"
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4",
              isLiked ? "fill-current" : "stroke-current"
            )}
          />
        </button>
      </AspectRatio>

      <div className="pt-4 px-4 pb-2 flex flex-col justify-between gap-2 md:h-54">
        <div className="flex flex-col">
          <Link
            to={`/recipe/${recipe.id}`}
            className="scroll-m-20 text-sm line-clamp-2 font-bold tracking-tight"
          >
            {recipe.title}
          </Link>

          <div className="flex mt-2 flex-wrap gap-1">
            {categories.map((item) => (
              <button
                key={item.id}
                className={clsx(
                  "capitalize px-2 py-1 rounded-full text-xs font-semibold transition-all",
                  "bg-secondary text-main"
                )}
              >
                {item.name.toLocaleLowerCase()}
              </button>
            ))}
          </div>
          <div className="text-sm mt-2 text-paragraph line-clamp-2 flex-grow">
            {recipe.description}
          </div>
        </div>

        <div className=" items-center justify-between">
          <div className="flex items-center gap-1 text-sm text-paragraph">
            <Hourglass className="h-4 w-4" />
            {minutes} {t(TRANSLATION_KEYS.recipe.minute)}
          </div>
          <div className="flex justify-between  items-center gap-2">
            <Stars rating={rate} />{" "}
            <span className="">
              ({((recipe.ratingAvg || 0) / 2).toFixed(1)})
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeItem;
