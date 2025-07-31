import { useState } from "react";
import { nanoid } from "nanoid";
import { Difficulty } from "@/types/enums/difficulty.enum";
import type { TagDto } from "@/types/tag/TagDto";
import type { ImageUpload } from "@/types/image/ImageUpload";
import type { UnitResponse } from "@/types/units/UnitResponse";
import type { IngredientResponse } from "@/types/ingredient/IngredientResponse";
import type { RecipeIngredientRequest } from "@/types/Recipe/RecipeIngredientRequest";
import type { RecipeInstructionRequest } from "@/types/Recipe/RecipeInstructionRequest";
import { toast } from "sonner";

export type UIInstruction = RecipeInstructionRequest & { id: string };

type UseCreateRecipeParams = {
  templates: IngredientResponse[];
};

const useCreateRecipe = ({ templates }: UseCreateRecipeParams) => {
  // ========== Basic Recipe Info ==========
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState(1);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [servings, setServings] = useState(1);
  const [category, setCategory] = useState<string[]>([]);

  // ========== Ingredients ==========
  const [ingredients, setIngredients] = useState<RecipeIngredientRequest[]>([]);

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      {
        templateId: "",
        unitId: "",
        quantity: 0,
        note: "",
        orderIndex: prev.length,
      },
    ]);
  };

  const updateIngredient = (
    index: number,
    updated: Partial<RecipeIngredientRequest>
  ) => {
    setIngredients((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...updated } : item))
    );
  };

  const removeIngredient = (index: number) => {
    setIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const getAllowedUnits = (templateId: string): UnitResponse[] => {
    return templates.find((t) => t.id === templateId)?.allowedUnits ?? [];
  };

  // ========== Instructions ==========
  const [instructions, setInstructions] = useState<UIInstruction[]>([]);

  const addInstruction = () => {
    const newId = nanoid();
    setInstructions((prev) => [
      ...prev,
      {
        id: newId,
        stepNumber: prev.length + 1,
        description: "",
        images: [],
      },
    ]);
  };

  const updateInstruction = (
    id: string,
    updated: Partial<RecipeInstructionRequest>
  ) => {
    setInstructions((prev) =>
      prev.map((ins) => (ins.id === id ? { ...ins, ...updated } : ins))
    );
  };

  const removeInstruction = (id: string) => {
    setInstructions((prev) => prev.filter((ins) => ins.id !== id));
  };

  const addInstructionImage = (
    instructionId: string,
    images: ImageUpload[]
  ) => {
    setInstructions((prev) =>
      prev.map((ins) => {
        if (ins.id === instructionId) {
          const currentImages = ins.images || [];
          const newImages = [...currentImages];

          // Kiểm tra trùng lặp và giới hạn 3 ảnh
          images.forEach((image) => {
            const isDuplicate = currentImages.some(
              (existing) =>
                existing.file.name === image.file.name &&
                existing.file.size === image.file.size
            );
            if (isDuplicate) {
              toast.error("Hình ảnh bị trùng lặp");
              return ins;
            }
            if (!isDuplicate && newImages.length < 3) {
              newImages.push({
                ...image,
                displayOrder: newImages.length,
              });
            }
          });

          if (newImages.length > 3) {
            toast.error("Tối đa 3 ảnh mỗi hướng dẫn");
            return ins;
          }

          return { ...ins, images: newImages };
        }
        return ins;
      })
    );
  };

  const removeInstructionImage = (instructionId: string, index: number) => {
    setInstructions((prev) =>
      prev.map((ins) =>
        ins.id === instructionId
          ? {
              ...ins,
              images: ins.images?.filter((_, i) => i !== index) || [],
            }
          : ins
      )
    );
  };

  

  // ========== Recipe Images ==========
  const [recipeImages, setRecipeImages] = useState<ImageUpload[]>([]);


  const addRecipeImage = (images: ImageUpload[]) => {
    setRecipeImages((prev) => [
      ...prev,
      ...images.map((image, index) => ({
        ...image,
        displayOrder: prev.length + index,
      })),
    ]);
  };

  const removeRecipeImage = (index: number) => {
    setRecipeImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ========== Tags ==========
  const [tags, setTags] = useState<TagDto[]>([]);

  const addTag = (tag: TagDto) => {
    setTags((prev) => [...prev, tag]);
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    // Recipe Info
    title,
    setTitle,
    description,
    setDescription,
    cookingTime,
    setCookingTime,
    difficulty,
    setDifficulty,
    servings,
    setServings,
    category,
    setCategory,

    // Ingredients
    ingredients,
    addIngredient,
    updateIngredient,
    removeIngredient,
    getAllowedUnits,

    // Instructions
    instructions,
    addInstruction,
    updateInstruction,
    removeInstruction,
    addInstructionImage,
    removeInstructionImage,

    // Recipe Images
    recipeImages,
    addRecipeImage,
    removeRecipeImage,

    // Tags
    tags,
    addTag,
    removeTag,
  };
};

export default useCreateRecipe;
