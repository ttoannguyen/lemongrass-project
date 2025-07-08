import { useIngredientTemplates } from "@/hooks/useIngredientTemplate";
import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { useRef, useState } from "react";
import type { ImageUpload } from "@/types/image/ImageUpload";
import { Difficulty } from "@/types/enums/difficulty.enum";
import { Progress } from "@/components/ui/progress";
import BasicInfoForm from "./BasicInfoForm";

interface RecipeFormValues {
  title: string;
  description: string;
  cookingTime: number;
  difficulty: Difficulty;
  servings: number;
  category: string;
  ingredients: {
    templateId: string;
    quantity: number;
    unitId: string;
    note?: string;
  }[];
  instructions: { stepNumber: number; description: string }[];
  tags: { name: string; color: string }[];
}

const CreateRecipe = () => {
  const { data: templates } = useIngredientTemplates();
  const [progress, setProgress] = useState(0);
  const [recipeImages, setRecipeImages] = useState<ImageUpload[]>([]);
  const [instructionImages, setInstructionImages] = useState<ImageUpload[][]>(
    []
  );
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const methods = useForm<RecipeFormValues>({
    defaultValues: {
      title: "",
      description: "",
      cookingTime: 1,
      difficulty: Difficulty.EASY,
      servings: 1,
      category: "",
      ingredients: [{ templateId: "", quantity: 1, unitId: "", note: "" }],
      instructions: [{ stepNumber: 1, description: "" }],
      tags: [],
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control: methods.control,
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control: methods.control,
    name: "instructions",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
  } = useFieldArray({
    control: methods.control,
    name: "tags",
  });

  const handleRecipeImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file, index) => ({
        file,
        displayOrder: recipeImages.length + index + 1,
      }));
      setRecipeImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleInstructionImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    instructionIndex: number
  ) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file, index) => ({
        file,
        displayOrder:
          (instructionImages[instructionIndex]?.length || 0) + index + 1,
      }));
      setInstructionImages((prev) => {
        const newInstructionImages = [...prev];
        newInstructionImages[instructionIndex] = [
          ...(newInstructionImages[instructionIndex] || []),
          ...newImages,
        ];
        return newInstructionImages;
      });
    }
  };

  const handleRemoveRecipeImage = (index: number) => {
    setRecipeImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveInstructionImage = (
    instructionIndex: number,
    imageIndex: number
  ) => {
    setInstructionImages((prev) => {
      const newInstructionImages = [...prev];
      newInstructionImages[instructionIndex] = newInstructionImages[
        instructionIndex
      ].filter((_, i) => i !== imageIndex);
      return newInstructionImages;
    });
  };

  const handleSubmit = methods.handleSubmit(async (data) => {
    setProgress(30);
    console.log("create recipe", data);

    try {
      // Assuming submitRecipe is a function to handle API submission
      const recipe = await submitRecipe({
        ...data,
        recipeImages,
        instructionImages,
      });
      console.log(recipe);
      setProgress(100);
      setTimeout(() => setProgress(0), 500);
    } catch (error) {
      alert(
        "Lỗi khi tạo công thức: " +
          (error instanceof Error ? error.message : "Unknown error")
      );
    }
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} className="p-6 max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Tạo Công Thức</h1>
        {progress > 0 && (
          <div className="fixed top-[-1px] left-0 right-0 z-50">
            <Progress
              value={progress}
              className="relative w-full h-1 bg-yellow-400"
            />
          </div>
        )}
        <BasicInfoForm />
        <TagsForm
          tags={tagFields}
          appendTag={appendTag}
          removeTag={removeTag}
        />
        <IngredientsForm
          ingredients={ingredientFields}
          templates={templates || []}
          appendIngredient={appendIngredient}
          removeIngredient={removeIngredient}
          getAllowedUnits={(templateId: string) =>
            templates?.find((t) => t.id === templateId)?.allowedUnits || []
          }
        />
        <InstructionsForm
          instructions={instructionFields}
          instructionImages={instructionImages}
          appendInstruction={appendInstruction}
          removeInstruction={removeInstruction}
          handleInstructionImageUpload={handleInstructionImageUpload}
          removeInstructionImage={handleRemoveInstructionImage}
        />
        <RecipeImagesForm
          recipeImages={recipeImages}
          handleRecipeImageUpload={handleRecipeImageUpload}
          removeRecipeImage={handleRemoveRecipeImage}
          canvasRef={canvasRef}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tạo công thức
        </button>
      </form>
    </FormProvider>
  );
};

export default CreateRecipe;
