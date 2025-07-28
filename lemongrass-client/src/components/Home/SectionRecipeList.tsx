// import RecipeItem from "@/components/Recipes/RecipeItem";
import type { RecipeResponse } from "@/types/Recipe/RecipeResponse";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

import RecipeItem from "../recipes/RecipeItem";

interface Props {
  title: string;
  recipes: RecipeResponse[];
  className?: string;
  textTitle?: string;
}

const SectionRecipeList = ({ title, recipes, className, textTitle }: Props) => {
 
  if (recipes.length === 0) return null;

  return (
    <section className={`px-4 py-8 ${className}`}>
      <h2
        className={`scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance my-2 mb-8 ${textTitle}`}
      >
      {title}
      </h2>

      <div className="w-250 mx-auto">
        <Carousel className="w-full">
          <CarouselContent className=" flex">
            {recipes.map((recipe) => (
              <CarouselItem
                key={recipe.id}
                className="pl-4 basis-[calc(100%/2)] md:basis-[calc(100%/3)] lg:basis-[calc(100%/4)]"
              >
                <RecipeItem recipe={recipe} />
              </CarouselItem>
            ))}{" "}
            {recipes.map((recipe) => (
              <CarouselItem
                key={recipe.id}
                className="pl-4 basis-[calc(100%/2)] md:basis-[calc(100%/3)] lg:basis-[calc(100%/4)]"
              >
                <RecipeItem recipe={recipe} />
              </CarouselItem>
            ))}{" "}
            {recipes.map((recipe) => (
              <CarouselItem
                key={recipe.id}
                className="pl-4 basis-[calc(100%/2)] md:basis-[calc(100%/3)] lg:basis-[calc(100%/4)]"
              >
                <RecipeItem recipe={recipe} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default SectionRecipeList;
