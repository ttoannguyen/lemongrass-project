import * as React from "react";
import { Link } from "react-router-dom";
import { Heart, Clock } from "lucide-react";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import { cn } from "@/lib/utils";

import { Stars } from "@/components/icons/StarComponent";

type RecipeItemMainProps = {
  recipe: RecipeResponse;
  className?: string;
  ratingCount?: number;
  onToggleFavorite?: (recipeId: string) => void;
  isFavorite?: boolean;
};

export function RecipeItemMain({
  recipe,
  ratingCount,
  onToggleFavorite,
  isFavorite = false,
}: RecipeItemMainProps) {
  const imageUrl = recipe.images?.[0]?.url ?? "";
  const minutes = recipe.cookingTime ?? 0;

  const handleFavClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    onToggleFavorite?.(recipe.id);
  };

  return (
    <div className="group rounded-xl bg-white overflow-hidden shadow hover:shadow-lg transition-shadow block">
      <header className="relative aspect-[3/4] w-full overflow-hidden">
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
          onClick={handleFavClick}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={cn(
            "absolute top-2 right-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white shadow transition",
            isFavorite ? "text-red-500" : "text-gray-600 hover:text-red-500"
          )}
        >
          <Heart
            className={cn(
              "h-4 w-4",
              isFavorite ? "fill-current" : "stroke-current"
            )}
          />
        </button>
      </header>

      {/* Content */}
      <div className="p-4">
        <Link
          to={`/recipe/${recipe.id}`}
          className="text-base font-bold leading-snug text-gray-900 line-clamp-2 mb-3"
        >
          {recipe.title}
        </Link>

        {/* Rating */}
        <div className="mb-3 flex items-center gap-2">
          <Stars rating={5.5} />
          {typeof ratingCount === "number" && (
            <span className="text-xs text-gray-500">({ratingCount})</span>
          )}
        </div>

        {/* Cooking time */}
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Clock className="h-4 w-4" />
          {minutes} mins
        </div>
      </div>
    </div>
  );
}

export default RecipeItemMain;
