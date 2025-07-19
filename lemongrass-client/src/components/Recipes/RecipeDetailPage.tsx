import { useParams } from "react-router-dom";
import { useRecipeDetail } from "@/hooks/queries/useRecipeDetailQuery";
import { Skeleton } from "@/components/ui/skeleton";
import AuthorHoverCard from "../Profile/AuthorHoverCard";

const RecipeDetailPage = () => {
  const { recipeId } = useParams<{ recipeId: string }>();

  const { data: recipe, isLoading, isError } = useRecipeDetail(recipeId || "");

  if (!recipeId) return <div>Không tìm thấy ID công thức</div>;
  if (isLoading)
    return (
      <div className="max-w-3xl mx-auto py-8 px-4">
        <Skeleton className="bg-text h-8 w-1/3 mb-4" />
        <Skeleton className="bg-text h-4 w-1/2 mb-2" />
        <Skeleton className="bg-text h-4 w-1/4 mb-2" />
        <Skeleton className="bg-text h-4 w-1/3 mb-2" />
        <Skeleton className="bg-text h-6 w-full mt-4" />
      </div>
    );
  if (isError || !recipe) return <div>Lỗi tải công thức</div>;
  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* {recipe.images && recipe.images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0.5 mb-6">
          {recipe.images.map((image, index) => (
            <img
              key={index}
              src={image.url}
              alt={`Recipe image ${index + 1}`}
              className="w-full h-60 object-center"
            />
          ))}
        </div>
      )} */}

      {recipe.images && recipe.images.length > 0 && (
        <div className="mb-6">
          <img
            src={recipe.images[0].url}
            alt="Main Recipe Image"
            className="w-full h-72 object-cover mb-4"
          />
          {recipe.images.length > 1 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-0.5">
              {recipe.images.slice(1).map((image, index) => (
                <img
                  key={index}
                  src={image.url}
                  alt={`Recipe image ${index + 2}`}
                  className="w-full h-40 object-cover "
                />
              ))}
            </div>
          )}
        </div>
      )}

      <h1 className="text-3xl font-bold">{recipe.title}</h1>

      <div className="text-gray-600 mt-2 space-y-1">
        <p>Thời gian nấu: {recipe.cookingTime} phút</p>
        <p>Độ khó: {recipe.difficulty}</p>
        <p>Khẩu phần: {recipe.servings}</p>
        <p>
          Danh mục:{" "}
          {recipe.categories.length > 0 &&
            recipe.categories.map((category) => (
              <span key={category.id}>{category.name}</span>
            ))}
        </p>
      </div>

      {recipe.tags.length > 0 && (
        <div className="flex gap-2 mt-4 flex-wrap">
          {recipe.tags.map((tag) => (
            <span
              key={tag.name}
              className="px-2 py-1 rounded text-white text-sm"
              style={{ backgroundColor: tag.color }}
            >
              {tag.name}
            </span>
          ))}
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Nguyên liệu</h2>
        <ul className="list-disc list-inside space-y-1">
          {recipe.ingredients
            .sort((a, b) => a.order - b.order)
            .map((ing) => (
              <li key={ing.id}>
                {ing.name} - {ing.quantity}
              </li>
            ))}
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Hướng dẫn</h2>
        {recipe.instructions
          .sort((a, b) => a.stepNumber - b.stepNumber)
          .map((step) => (
            <div key={step.id} className="mb-4">
              <p className="font-medium">
                Bước {step.stepNumber}: {step.description}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {step.images
                  .sort((a, b) => a.displayOrder - b.displayOrder)
                  .map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      alt={`Step ${step.stepNumber}`}
                      className="w-32 h-32 object-cover rounded"
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>

      <div className="mt-6 flex items-center gap-4 text-sm text-gray-500">
        <p>Tác giả:</p>
        <AuthorHoverCard
          author={recipe.accountShortResponse}
          createdAt={recipe.createdDate}
        />
      </div>

      <div className="mt-6 flex gap-4 text-sm text-gray-500">
        <p>Số lượt chia sẻ: {recipe.shareCount}</p>
        <p>{recipe.verified ? "Đã xác thực" : "Chưa xác thực"}</p>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
