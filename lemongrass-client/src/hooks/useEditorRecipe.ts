// src/hooks/useEditRecipe.ts
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { toast } from "sonner";

import type { CategoryResponse } from "@/types/category/CategoryResponse";
import type { ImageUpload } from "@/types/image/ImageUpload";
import { Difficulty } from "@/types/enums/difficulty.enum";

import { useGetDataToUpdateRecipe } from "./queries/useRecipeQuery";
import { useIngredientTemplates } from "./queries/useIngredientTemplate";

import type {
  RecipeIngredientUpdateRequest,
  RecipeInstructionUpdateRequest,
} from "@/types/Recipe/RecipeUpdateRequest";

export const useEditRecipe = (recipeId: string) => {
  const { data: templateIngredients = [] } = useIngredientTemplates();
  const { data: recipe } = useGetDataToUpdateRecipe(recipeId);

  const [isLoading, setIsLoading] = useState(true);

  // basic info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState(1);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [servings, setServings] = useState(1);
  const [category, setCategory] = useState<string[]>([]);

  // ingredients (update) -- uses index-based update to remain compatible with existing IngredientList
  const [ingredients, setIngredients] = useState<
    RecipeIngredientUpdateRequest[]
  >([]);
  const addIngredient = () =>
    setIngredients((prev) => [
      ...prev,
      {
        clientId: crypto.randomUUID(),
        templateId: "",
        unitId: "",
        quantity: 0,
        note: "",
        orderIndex: prev.length,
      },
    ]);
  const updateIngredient = (
    index: number,
    updated: Partial<RecipeIngredientUpdateRequest>
  ) =>
    setIngredients((prev) =>
      prev.map((ing, i) => (i === index ? { ...ing, ...updated } : ing))
    );
  const removeIngredient = (index: number) =>
    setIngredients((prev) => prev.filter((_, i) => i !== index));

  // instructions (update) -- use id-based ops to work with sortable list
  const [instructions, setInstructions] = useState<
    RecipeInstructionUpdateRequest[]
  >([]);
  const addInstruction = () =>
    setInstructions((prev) => [
      ...prev,
      {
        id: nanoid(),
        stepNumber: prev.length + 1,
        description: "",
        images: [],
      },
    ]);

  const updateInstruction = (
    id: string,
    updated: Partial<RecipeInstructionUpdateRequest>
  ) =>
    setInstructions((prev) =>
      prev.map((ins) => (ins.id === id ? { ...ins, ...updated } : ins))
    );

  const removeInstruction = (id: string) =>
    setInstructions((prev) => prev.filter((ins) => ins.id !== id));

  const addInstructionImage = (instructionId: string, images: ImageUpload[]) =>
    setInstructions((prev) =>
      prev.map((ins) => {
        if (ins.id !== instructionId) return ins;
        const currentImages = ins.images ?? [];
        const newImages = [
          ...currentImages,
          ...images.map((img, idx) => ({
            ...img,
            displayOrder: currentImages.length + idx,
          })),
        ];
        return { ...ins, images: newImages };
      })
    );

  const removeInstructionImage = (instructionId: string, imgIndex: number) =>
    setInstructions((prev) =>
      prev.map((ins) =>
        ins.id === instructionId
          ? { ...ins, images: ins.images.filter((_, i) => i !== imgIndex) }
          : ins
      )
    );

  // recipe images (update)
  const [recipeImages, setRecipeImages] = useState<ImageUpload[]>([]);
  const addRecipeImage = (images: ImageUpload[]) =>
    setRecipeImages((prev) => [
      ...prev,
      ...images.map((img, idx) => ({
        ...img,
        displayOrder: prev.length + idx,
      })),
    ]);
  const removeRecipeImage = (index: number) =>
    setRecipeImages((prev) => prev.filter((_, i) => i !== index));

  // load recipe -> map into states
  useEffect(() => {
    if (!recipeId || !recipe) return;
    setIsLoading(true);

    try {
      // basic info
      setTitle(recipe.title ?? "");
      setDescription(recipe.description ?? "");
      setCookingTime(recipe.cookingTime ?? 1);
      setServings(recipe.servings ?? 1);
      setDifficulty((recipe.difficulty ?? difficulty) as Difficulty);
      setCategory(
        Array.isArray(recipe.categories)
          ? recipe.categories.map((c: CategoryResponse) => c.id)
          : []
      );

      // ingredients
      setIngredients(
        Array.isArray(recipe.ingredients)
          ? recipe.ingredients.map((ing, idx: number) => ({
              id: ing.id,
              templateId: ing.templateId ?? ing.id ?? "",
              unitId: ing.unitId ?? "",
              quantity: Number(ing.quantity ?? 0),
              note: ing.note ?? "",
              orderIndex: typeof ing.order === "number" ? ing.order : idx,
            }))
          : []
      );

      // instructions
      setInstructions(
        Array.isArray(recipe.instructions)
          ? recipe.instructions.map((ins, idx: number) => ({
              id: ins.id ?? nanoid(),
              stepNumber:
                typeof ins.stepNumber === "number" ? ins.stepNumber : idx + 1,
              description: ins.description ?? "",
              images: Array.isArray(ins.images)
                ? ins.images.map((img) => ({
                    id: img.id,
                    previewUrl: img.url, // hiển thị từ server
                    file: undefined, // chỉ có khi user upload mới
                    displayOrder:
                      typeof img.displayOrder === "number"
                        ? img.displayOrder
                        : 0,
                  }))
                : [],
            }))
          : []
      );

      // recipe images
      setRecipeImages(
        Array.isArray(recipe.images)
          ? recipe.images.map((img) => ({
              id: img.id,
              previewUrl: img.url,
              file: undefined,
              displayOrder:
                typeof img.displayOrder === "number" ? img.displayOrder : 0,
            }))
          : []
      );
    } catch (err) {
      toast.error("Không tải được dữ liệu công thức.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId, recipe]);

  return {
    // basic
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

    // ingredients (index-based update)
    ingredients,
    addIngredient,
    updateIngredient,
    removeIngredient,

    // instructions (id-based update)
    instructions,
    addInstruction,
    updateInstruction,
    removeInstruction,
    addInstructionImage,
    removeInstructionImage,

    // recipe images
    recipeImages,
    addRecipeImage,
    removeRecipeImage,

    templateIngredients,
    isLoading,
  };
};

export default useEditRecipe;
