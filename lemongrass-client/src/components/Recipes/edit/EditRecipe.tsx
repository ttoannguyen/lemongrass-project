import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CircleAlert, Eye, Upload } from "lucide-react";

import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import { useUnitQuery } from "@/hooks/queries/useUnitQuery";

import { Difficulty } from "@/types/enums/difficulty.enum";

import PreviewRecipe from "../create/ReviewRecipe";
import RecipeGeneralInfo from "../create/RecipeGeneralInfo";
import IngredientList from "../create/IngredientList";
import InstructionList from "../create/InstructionList";

import type { RecipeUpdateRequest } from "@/types/Recipe/RecipeUpdateRequest";
import { useEditRecipe } from "@/hooks/useEditorRecipe";
import { recipeUpdateService } from "@/services/recipe/recipe.update.service";
import { useQueryClient } from "@tanstack/react-query";

const EditRecipe = () => {
  const { recipeId = "" } = useParams<{ recipeId: string }>();
  const queryClient = useQueryClient();
  const { data: categories = [] } = useCategoryQuery();
  const { data: units = [] } = useUnitQuery();

  const {
    title,
    setTitle,
    description,
    setDescription,
    difficulty,
    setDifficulty,
    servings,
    setServings,
    cookingTime,
    setCookingTime,
    category,
    setCategory,
    ingredients,
    addIngredient,
    updateIngredient,
    removeIngredient,
    instructions,
    addInstruction,
    updateInstruction,
    removeInstruction,
    addInstructionImage,
    removeInstructionImage,
    recipeImages,
    addRecipeImage,
    removeRecipeImage,
    templateIngredients,
    isLoading,
  } = useEditRecipe(recipeId);

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleUpdate = async () => {
    try {
      if (!title.trim()) return toast.error("Vui lòng nhập tiêu đề.");
      if (!description.trim()) return toast.error("Vui lòng nhập mô tả.");
      if (cookingTime <= 0) return toast.error("Thời gian nấu phải > 0.");
      if (servings <= 0) return toast.error("Số khẩu phần phải > 0.");
      if (!Object.values(Difficulty).includes(difficulty))
        return toast.error("Chọn mức độ khó hợp lệ.");
      if (category.length === 0)
        return toast.error("Vui lòng chọn ít nhất một danh mục.");
      if (ingredients.length === 0)
        return toast.error("Vui lòng thêm nguyên liệu.");
      if (instructions.length === 0)
        return toast.error("Vui lòng thêm hướng dẫn.");

      const payload: RecipeUpdateRequest = {
        id: recipeId,
        title,
        cookingTime,
        servings,
        description,
        difficulty,
        categoryIds: category,
        ingredients,
        instructions,
        images: recipeImages,
      };

      setUploadProgress(0);
      // gọi service update thật ở đây:
      await recipeUpdateService.update(recipeId, payload, (progress) =>
        setUploadProgress(progress)
      );
      
      console.log("Update payload:", recipeId, payload);
      queryClient.invalidateQueries({ queryKey: ["recipes"], exact: false });
      setUploadProgress(null);
      toast.success("Cập nhật công thức thành công!");
    } catch (err) {
      toast.error("Cập nhật thất bại.");
      console.error(err);
    }
  };

  if (isLoading) return <div className="p-6">Đang tải công thức...</div>;

  return (
    <div className="min-h-screen relative">
      <div className="fixed top-0 w-full flex items-center h-16 px-4 bg-white shadow z-50">
        <Link
          to="/"
          className="text-paragraph ml-4 bg-main/10 px-2 p-1 rounded-sm border border-stroke/10"
        >
          Home
        </Link>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
          Edit Recipe
        </h1>
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="mr-2 h-4 w-4" /> Xem trước
          </Button>

          <PreviewRecipe
            open={showPreview}
            onClose={() => setShowPreview(false)}
            data={{
              title,
              cookingTime,
              servings,
              description,
              difficulty,
              categoryIds: category,
              ingredients: ingredients.map((i) => ({
                ...i,
                note: i.note ?? "",
              })),
              instructions,
              images: recipeImages,
            }}
            ingredientTemplates={templateIngredients}
            units={units}
          />

          {uploadProgress !== null && (
            <div className="flex items-center gap-2 ml-4">
              <Progress value={uploadProgress} className="w-[150px]" />
              <span className="text-sm">
                {uploadProgress < 100
                  ? `Uploading: ${uploadProgress}%`
                  : "Đang xử lý..."}
              </span>
            </div>
          )}
          <Button size="sm" onClick={handleUpdate}>
            <Upload className="mr-2 h-4 w-4" /> Cập nhật
          </Button>
        </div>
      </div>

      {/* main */}
      <div className="flex gap-4 bg-main min-h-screen pt-16 px-2">
        <RecipeGeneralInfo
          title={title}
          setTitle={setTitle}
          servings={servings}
          setServings={setServings}
          cookingTime={cookingTime}
          setCookingTime={setCookingTime}
          onUpload={addRecipeImage}
          description={description}
          setDescription={setDescription}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          categoryIds={category}
          categories={categories}
          setCategoryIds={setCategory}
          onRemoveImage={removeRecipeImage}
          recipeImages={recipeImages}
        />
        <div className="w-full">
          <h1 className="text-paragraph font-semibold text-lg mt-4 mb-2 mx-2">
            DETAIL
          </h1>
          <div className="flex gap-4 flex-col">
            {/* ingredients */}
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="font-medium text-paragraph flex items-center mb-4">
                <p className="text-sm mr-2">Ingredient</p>
                <CircleAlert className="size-3 text-paragraph" />
              </div>

              <IngredientList
                addIngredient={addIngredient}
                ingredients={ingredients}
                removeIngredient={removeIngredient}
                templateIngredients={templateIngredients}
                updateIngredient={updateIngredient}
              />
            </div>

            {/* instructions */}
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="font-medium text-paragraph flex items-center mb-4">
                <p className="text-sm mr-2">Instruction</p>
                <CircleAlert className="size-3 text-paragraph" />
              </div>

              <InstructionList
                addInstruction={addInstruction}
                instructions={instructions}
                removeInstruction={removeInstruction}
                updateInstruction={updateInstruction}
                addInstructionImage={addInstructionImage}
                removeInstructionImage={removeInstructionImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRecipe;
