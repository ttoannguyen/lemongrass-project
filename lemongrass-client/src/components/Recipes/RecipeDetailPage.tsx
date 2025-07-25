import { useParams } from "react-router-dom";
import { useRecipeDetail } from "@/hooks/queries/useRecipeDetailQuery";
import { useRef } from "react";
import AuthorHoverCard from "../profile/AuthorHoverCard";
import { Clock, Flame, Users, ChevronDown } from "lucide-react";
import { AspectRatio } from "../ui/aspect-ratio";

const RecipeDetailPage = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const { data: recipe, isError } = useRecipeDetail(recipeId || "");
  const instructionRef = useRef<HTMLDivElement | null>(null);

  if (!recipeId || isError || !recipe)
    return (
      <div className="text-center text-red-500 py-8">Lỗi tải công thức</div>
    );

  const handleScroll = () => {
    instructionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Ảnh đại diện công thức */}
      <AspectRatio ratio={21 / 9}>
        <img
          src={recipe.images[0]?.url}
          alt={recipe.title}
          className="w-full h-full object-cover"
        />
      </AspectRatio>

      {/* Nội dung chi tiết */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>
              {/* {recipe.prepTime ?? "?"}  */}
              phút chuẩn bị
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="w-4 h-4" />
            <span>{recipe.cookingTime} phút nấu</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{recipe.servings} khẩu phần</span>
          </div>
        </div>

        {/* Nút scroll tới phần công thức */}
        <div className="flex justify-center my-6">
          <button
            onClick={handleScroll}
            className="flex items-center gap-2 px-4 py-2 border rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            <ChevronDown className="w-4 h-4" />
            Xem công thức ngay
          </button>
        </div>

        {/* Nguyên liệu */}
        <section>
          <h2 className="text-2xl font-semibold mb-3">🥕 Nguyên liệu</h2>
          <ul className="list-disc list-inside space-y-1 text-gray-800">
            {recipe.ingredients
              .sort((a, b) => a.order - b.order)
              .map((ing) => (
                <li key={ing.id}>
                  {ing.name} - {ing.quantity}
                </li>
              ))}
          </ul>
        </section>

        {/* Hướng dẫn nấu */}
        <section className="mt-10" ref={instructionRef}>
          <h2 className="text-2xl font-semibold mb-4">👩‍🍳 Cách làm</h2>
          {recipe.instructions
            .sort((a, b) => a.stepNumber - b.stepNumber)
            .map((step) => (
              <div key={step.id} className="mb-6">
                <p className="font-medium mb-2">
                  Bước {step.stepNumber}: {step.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {step.images
                    .sort((a, b) => a.displayOrder - b.displayOrder)
                    .map((img, index) => (
                      <img
                        key={index}
                        src={img.url}
                        alt={`Hình bước ${step.stepNumber}`}
                        className="w-32 h-32 object-cover rounded"
                      />
                    ))}
                </div>
              </div>
            ))}
        </section>

        {/* Tác giả và thời gian */}
        <div className="mt-10 flex items-center gap-4 text-sm text-gray-500">
          <p>Người đăng:</p>
          <AuthorHoverCard
            author={recipe.accountShortResponse}
            createdAt={recipe.createdDate}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
