import { useParams } from "react-router-dom";
import { useRecipeDetail } from "@/hooks/queries/useRecipeDetailQuery";
import { useRef } from "react";
import AuthorHoverCard from "../../profile/AuthorHoverCard";
import { Flame, Users } from "lucide-react";
import { AspectRatio } from "../../ui/aspect-ratio";
import AvatarAuthor from "../../AvatarAuhtor";
import { format } from "date-fns";
import { Button } from "../../ui/button";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Stars } from "../../icons/StarComponent";

const RecipeDetailPage = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data: recipe, isError } = useRecipeDetail(recipeId || "");
  const instructionRef = useRef<HTMLDivElement | null>(null);

  if (!recipeId || isError)
    return (
      <div className="text-center text-red-500 py-8">Lỗi tải công thức</div>
    );
  if (!recipe)
    return (
      <div className="text-center text-gray-500 py-8">
        Đang tải công thức...
      </div>
    );

  const categories = recipe.categories;
  const rate = recipe.ratingAvg == null ? 0 : recipe.ratingAvg;
  const handleScroll = () => {
    instructionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toTitleCase = (str: string) =>
    str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  console.log(recipe);
  return (
    <div className="relative px-4 lg:px-8 max-w-5xl mx-auto py-6">
      {/* Tiêu đề & Tác giả */}
      <h1 className="text-3xl font-bold mb-2 text-foreground">
        {toTitleCase(recipe.title)}
      </h1>

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-3">
          <AvatarAuthor
            avatarUrl={
              recipe.accountShortResponse.profilePictureUrl ?? undefined
            }
            avatarFallback={recipe.accountShortResponse.username}
          />
          <div>
            <p className="text-base font-semibold text-paragraph">
              {recipe.accountShortResponse.firstName +
                " " +
                recipe.accountShortResponse.lastName}
            </p>
            <p className="text-sm font-medium text-paragraph/50">
              Modified:{" "}
              {format(new Date(recipe.lastModifiedDate), "MMM d, yyyy")}
            </p>
          </div>
        </div>

        <Button
          onClick={handleScroll}
          className="w-max px-4 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
        >
          Xem công thức ngay
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex items-center gap-1 text-paragraph font-medium">
          <Stars rating={rate} />
          <span>({11}) Reviews</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((item) => (
          <Link
            key={item.id}
            to={`/recipe/category/${item.id}`}
            className={clsx(
              "capitalize px-2 py-1 text-xs font-semibold border rounded-full",
              "border-secondary text-secondary hover:bg-secondary hover:text-main transition"
            )}
          >
            {item.name.toLowerCase()}
          </Link>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-10">
        <p className="text-paragraph md:min-w-lg text-justify text-lg leading-relaxed break-words max-w-2xl">
          {recipe.description}
        </p>
        <AspectRatio ratio={16 / 9} className="min-w-[300px]">
          <img
            src={recipe.images[0]?.url}
            alt={recipe.title}
            className="w-full h-full object-cover rounded-lg shadow"
          />
        </AspectRatio>
      </div>

      <div className="flex flex-wrap items-center gap-4 mb-8">
        <div className="flex items-center bg-white px-4 py-2 rounded-xl gap-2 shadow-sm">
          <Flame className="w-4 h-4 text-orange-500" />
          <span>{recipe.cookingTime} minutes</span>
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-xl gap-2 shadow-sm">
          <Users className="w-4 h-4 text-blue-500" />
          <span>{recipe.servings} servings</span>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-3xl font-bold text-headline mb-4">Ingredients</h2>
        <div className="flex flex-row gap-4">
          {recipe.ingredients
            .sort((a, b) => a.order - b.order)
            .map((ing) => (
              <div
                key={ing.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-stroke/10 hover:shadow-md transition-all"
              >
                <div className="flex items-baseline justify-between  capitalize ">
                  <p className="text-lg mr-10 font-medium text-paragraph">
                    {ing.name}
                  </p>
                  <p className="text-sm text-paragraph/70">
                    {ing.quantity} {ing.unitName}
                  </p>
                </div>
                <p className="text-sm  text-paragraph/70">{ing.note}</p>
              </div>
            ))}
        </div>
      </section>

      <section className="" ref={instructionRef}>
        <h2 className="text-3xl font-bold text-headline mb-4">Instructions</h2>
        <div className="space-y-4">
          {recipe.instructions
            .sort((a, b) => a.stepNumber - b.stepNumber)
            .map((step) => (
              <div
                key={step.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-stroke/10"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center bg-headline text-white font-bold rounded-full shadow">
                    {step.stepNumber}
                  </div>
                  {/* <div className=""> */}
                  <p className="text-paragraph text-justify text-lg leading-relaxed break-words">
                    {step.description +
                      step.description +
                      step.description +
                      step.description}
                  </p>
                  {/* </div> */}
                </div>

                {step.images.length > 0 && (
                  <div className="flex flex-wrap gap-3 ml-14">
                    {step.images
                      .sort((a, b) => a.displayOrder - b.displayOrder)
                      .map((img, index) => (
                        <img
                          key={index}
                          src={img.url}
                          alt={`Step ${step.stepNumber} image`}
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      ))}
                  </div>
                )}
              </div>
            ))}
        </div>
      </section>

      <div className="mt-10 flex items-center gap-4 text-sm text-gray-500">
        <p>Người đăng:</p>
        <AuthorHoverCard
          author={recipe.accountShortResponse}
          createdAt={recipe.createdDate}
        />
      </div>
    </div>
  );
};

export default RecipeDetailPage;
