import { useEffect, useState } from "react";
import RecipeGeneralInfo from "./RecipeGeneralInfo";
import { CircleAlert, Eye, Upload } from "lucide-react";
import IngredientList from "./IngredientList";
import InstructionList from "./InstructionList";
import { useIngredientTemplates } from "@/hooks/queries/useIngredientTemplate";
import { Button } from "@/components/ui/button";
import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import { recipeCreateService } from "@/services/recipe/recipe.createFormData.service";
import { toast } from "sonner";
import useCreateRecipe from "@/hooks/useCreateRecipe";
import type { RecipeCreateRequest } from "@/types/Recipe/RecipeRequest";
import { Difficulty } from "@/types/enums/difficulty.enum";
import { Link } from "react-router-dom";
import { Progress } from "@/components/ui/progress";
import PreviewRecipe from "./ReviewRecipe";
import { useUnitQuery } from "@/hooks/queries/useUnitQuery";

const Create = () => {
  const { data: templateIngredients = [] } = useIngredientTemplates();
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
    addIngredient,
    ingredients,
    updateIngredient,
    removeIngredient,
    removeInstruction,
    recipeImages,
    removeInstructionImage,
    removeRecipeImage,
    addInstructionImage,
    addInstruction,
    instructions,
    updateInstruction,
    addRecipeImage,
  } = useCreateRecipe({ templates: templateIngredients });

  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (ingredients.length === 0 && templateIngredients.length > 0) {
      addIngredient();
    }
  }, [templateIngredients, ingredients, addIngredient]);

  const handlePublish = async () => {
    try {
      const validIngredients = ingredients.every(
        (i) => i.templateId && i.unitId && i.quantity > 0
      );

      if (recipeImages.length === 0) {
        toast.error("Vui lòng thêm ít nhất một bước hướng dẫn.");
        return;
      }

      if (!title.trim()) {
        toast.error("Vui lòng nhập tiêu đề công thức.");
        return;
      }

      if (!description.trim()) {
        toast.error("Vui lòng nhập mô tả công thức.");
        return;
      }

      if (cookingTime <= 0) {
        toast.error("Thời gian nấu phải lớn hơn 0.");
        return;
      }

      if (servings <= 0) {
        toast.error("Số khẩu phần phải lớn hơn 0.");
        return;
      }

      if (!Object.values(Difficulty).includes(difficulty)) {
        toast.error("Vui lòng chọn mức độ khó hợp lệ.");
        return;
      }

      if (category.length === 0) {
        toast.error("Vui lòng chọn ít nhất một danh mục.");
        return;
      }

      if (ingredients.length === 0) {
        toast.error("Vui lòng thêm ít nhất một nguyên liệu.");
        return;
      }

      if (!validIngredients) {
        toast.error(
          "Please provide valid Ingredient, units, and quantity for all ingredients."
        );
        return;
      }

      if (instructions.length === 0) {
        toast.error("Vui lòng thêm ít nhất một bước hướng dẫn.");
        return;
      }

      const validInstructions = instructions.every((ins) =>
        ins.description.trim()
      );
      if (!validInstructions) {
        toast.error("Vui lòng nhập mô tả cho tất cả các bước hướng dẫn.");
        return;
      }

      const payload: RecipeCreateRequest = {
        title,
        cookingTime,
        servings,
        
        description,
        difficulty,
        categoryIds: category,
        ingredients: ingredients.map((i, index) => ({
          templateId: i.templateId,
          unitId: i.unitId,
          quantity: i.quantity,
          note: i.note ?? "",
          orderIndex: index,
        })),
        instructions: instructions.map((ins, index) => ({
          stepNumber: index + 1,
          description: ins.description,
          images: ins.images ?? [],
        })),
        images: recipeImages,
      };

      console.log("Payload:", payload);
      setUploadProgress(0);

      const recipe = await recipeCreateService.createRecipe(
        payload,
        (progress) => {
          setUploadProgress(progress);
        }
      );
      setUploadProgress(null);
      toast.success("Recipe created successfully!");
      console.log("Recipe created:", recipe);
    } catch (error) {
      toast.error("Failed to create recipe. Please try again.");
      console.error("Failed to create recipe:", error);
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="fixed z-50 top-0 w-full flex items-center h-16 px-4 bg-white shadow">
        <div className="absolute z-50">
          <Link
            to={"/"}
            className="text-paragraph ml-4 bg-main/10 px-2 p-1 rounded-sm border border-stroke/10"
          >
            Home
          </Link>
        </div>
        <h1 className="absolute left-1/2 -translate-x-1/2 text-lg font-semibold">
          CreateNav
        </h1>
        <div className="ml-auto flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreview(true)}
          >
            <Eye className="mr-2 h-4 w-4" />
            See preview
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
              ingredients: ingredients.map((i, index) => ({
                templateId: i.templateId,
                unitId: i.unitId,
                quantity: i.quantity,
                note: i.note ?? "",
                orderIndex: index,
              })),
              instructions: instructions.map((ins, index) => ({
                stepNumber: index + 1,
                description: ins.description,
                images: ins.images?.map((img) => ({
                  ...img,
                  previewUrl: img.file
                    ? URL.createObjectURL(img.file)
                    : undefined,
                })),
              })),
              images: recipeImages.map((img, index) => ({
                ...img,
                displayOrder: index,
                previewUrl: img.file
                  ? URL.createObjectURL(img.file)
                  : undefined,
              })),
            }}
            ingredientTemplates={templateIngredients}
            units={units}
          />

          {uploadProgress !== null && (
            <div className="flex items-center gap-2 ml-4">
              {uploadProgress < 100 ? (
                <>
                  <Progress value={uploadProgress} className="w-[150px]" />
                  <span className="text-sm text-muted-foreground">
                    Uploading: {uploadProgress}%
                  </span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground animate-pulse">
                  Đang xử lý trên máy chủ...
                </span>
              )}
            </div>
          )}

          <Button size="sm" onClick={handlePublish}>
            <Upload className="mr-2 h-4 w-4" />
            Publish Recipe
          </Button>
        </div>
      </div>
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
            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="font-medium text-paragraph flex items-center mb-4">
                <p className="text-sm mr-2">Ingredient</p>
                <CircleAlert className="size-3 text-paragraph my-auto" />
              </div>

              <IngredientList
                addIngredient={addIngredient}
                ingredients={ingredients}
                removeIngredient={removeIngredient}
                templateIngredients={templateIngredients}
                updateIngredient={updateIngredient}
              />
            </div>

            <div className="bg-white p-4 rounded-md shadow-sm">
              <div className="font-medium text-paragraph flex items-center mb-4">
                <p className="text-sm mr-2">Instruction</p>
                <CircleAlert className="size-3 text-paragraph my-auto" />
              </div>
              <InstructionList
                addInstructionImage={addInstructionImage}
                addInstruction={addInstruction}
                instructions={instructions}
                removeInstruction={removeInstruction}
                updateInstruction={updateInstruction}
                removeInstructionImage={removeInstructionImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
