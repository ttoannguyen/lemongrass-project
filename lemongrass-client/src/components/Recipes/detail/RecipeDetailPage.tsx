import { useParams } from "react-router-dom";
import { useRecipeDetail } from "@/hooks/queries/useRecipeDetailQuery";
import { useRef, useState } from "react";
import { format } from "date-fns";
import { Button } from "../../ui/button";
import { Link } from "react-router-dom";
import { vi } from "date-fns/locale";
import RecipeExportModal from "./RecipeExportModal";
import AvatarAuthor from "@/components/AvatarAuhtor";
import { Stars } from "@/components/icons/StarComponent";
import clsx from "clsx";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Flame, Users } from "lucide-react";
// import AuthorHoverCard from "@/components/profile/AuthorHoverCard";
import { useSubmitRating } from "@/hooks/queries/useSubmitRating";
import RecipeCommentSection from "@/components/comment/RecipeCommentSection";

const RecipeDetailPage = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data: recipe, isError } = useRecipeDetail(recipeId || "");
  const instructionRef = useRef<HTMLDivElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: submitRating } = useSubmitRating(recipeId || "");

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

  console.log(recipe);
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
  const handleRate = (rating: number) => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
      return;
    }
    submitRating(rating);
  };
  return (
    <div className="relative px-4 lg:px-8 max-w-5xl mx-auto py-6">
      <RecipeExportModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipe={recipe}
      />

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
            <Link to={`/account/${recipe.accountShortResponse.id}`} className="text-base font-semibold text-paragraph">
              {recipe.accountShortResponse.firstName +
                " " +
                recipe.accountShortResponse.lastName}
            </Link>

            <p className="text-sm font-medium text-paragraph/50">
              {" "}
              {format(new Date(recipe.createdDate), "MMM d, yyyy", {
                locale: vi,
              })}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {/* <Link
            to={`/edit-recipe/${recipeId}`}
            className="w-max px-4 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Chỉnh sửa công thức
          </Link> */}
          <Button
            onClick={handleScroll}
            className="w-max px-4 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Xem công thức ngay
          </Button>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="w-max px-4 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Xuất công thức thành PDF
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-3">
        <div className="flex items-center gap-1 text-paragraph font-medium">
          <Stars rating={rate} interactive={true} onRate={handleRate} />
          <span>({((recipe.ratingAvg || 0) / 2).toFixed(1)})</span>
          <span>({recipe.ratingCount || 0}) Đánh giá</span>
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
        <AspectRatio ratio={4 / 1} className="min-w-[300px]">
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
          <span>{recipe.cookingTime} phút</span>
        </div>
        <div className="flex items-center bg-white px-4 py-2 rounded-xl gap-2 shadow-sm">
          <Users className="w-4 h-4 text-blue-500" />
          <span>Khẩu phần: {recipe.servings} người </span>
        </div>
      </div>

      <section className="mb-10">
        <h2 className="text-3xl font-bold text-headline mb-4">Nguyên liệu</h2>
        <div className="flex flex-row flex-wrap gap-4">
          {recipe.ingredients
            .sort((a, b) => a.order - b.order)
            .map((ing) => (
              <div
                key={ing.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-stroke/10 hover:shadow-md transition-all"
              >
                <div className="flex items-baseline justify-between capitalize">
                  <p className="text-lg mr-10 font-medium text-paragraph">
                    {ing.name}
                  </p>
                  <p className="text-sm text-paragraph/70">
                    {ing.quantity} {ing.unitName}
                  </p>
                </div>
                <p className="text-sm text-paragraph/70">{ing.note}</p>
              </div>
            ))}
        </div>
      </section>

      <section ref={instructionRef}>
        <h2 className="text-3xl font-bold text-headline mb-4">Hướng dẫn</h2>
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
                  <p className="text-paragraph text-justify text-lg leading-relaxed break-words">
                    {step.description}
                  </p>
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
      
      {/* <div className="mt-10 flex items-center gap-4 text-sm text-gray-500">
        <p>Người đăng:</p>
        <AuthorHoverCard
         authorId={recipe.accountShortResponse.id}
          authorUsername={recipe.accountShortResponse.username}
          profilePictureUrl={recipe.accountShortResponse.profilePictureUrl !}
          firstName={recipe.accountShortResponse.firstName}
          lastName={recipe.accountShortResponse.lastName}
          createdAt={recipe.createdDate}
        />
      </div> */}
      <RecipeCommentSection recipeId={recipeId} />

    </div>
  );
};

export default RecipeDetailPage;
