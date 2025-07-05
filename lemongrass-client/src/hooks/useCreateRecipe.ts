import { useState } from "react";
import { Difficulty } from "@/types/enums/difficulty.enum";
import type { RecipeIngredientRequest } from "@/types/Recipe/RecipeIngredientRequest";
import type { TagDto } from "@/types/tag/TagDto";
import type { RecipeInstructionRequest } from "@/types/Recipe/RecipeInstructionRequest";
import type { Unit } from "@/types/units/Unit";
import type { RecipeCreateRequest } from "@/types/Recipe/RecipeRequest";
import type { IngredientTemplateResponse } from "@/types/Recipe/IngredientTemplateResponse";
import { recipeCreateService } from "../services/recipe/recipe.createFormData.service";
import type { ImageUpload } from "@/types/image/ImageUpload";

type UseCreateRecipeParams = {
  templates: IngredientTemplateResponse[];
};

const useCreateRecipe = ({ templates }: UseCreateRecipeParams) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState(1);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [servings, setServings] = useState(1);
  const [category, setCategory] = useState("");
  const [ingredients, setIngredients] = useState<RecipeIngredientRequest[]>([]);
  const [instructions, setInstructions] = useState<RecipeInstructionRequest[]>(
    []
  );
  const [recipeImages, setRecipeImages] = useState<ImageUpload[]>([]);
  const [instructionImages, setInstructionImages] = useState<ImageUpload[][]>(
    []
  );
  const [tags, setTags] = useState<TagDto[]>([]);

  const addIngredient = () => {
    setIngredients((prev) => [
      ...prev,
      {
        templateId: "",
        unitId: "",
        order: 0,
        note: "",
        orderIndex: 0,
        quantity: 0,
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

  const addInstruction = () => {
    setInstructions((prev) => [
      ...prev,
      {
        stepNumber: prev.length + 1,
        description: "",
        images: [],
      },
    ]);
    setInstructionImages((prev) => [...prev, []]);
  };

  const updateInstruction = (
    index: number,
    updated: Partial<RecipeInstructionRequest>
  ) => {
    setInstructions((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...updated } : item))
    );
  };

  const removeInstruction = (index: number) => {
    setInstructions((prev) => prev.filter((_, i) => i !== index));
    setInstructionImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addRecipeImage = (image: ImageUpload) => {
    setRecipeImages((prev) => [...prev, image]);
  };

  const removeRecipeImage = (index: number) => {
    setRecipeImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addInstructionImage = (
    instructionIndex: number,
    image: ImageUpload
  ) => {
    setInstructionImages((prev) => {
      const newImages = [...prev];
      const current = newImages[instructionIndex] || [];
      const updatedImages = [...current, image];
      newImages[instructionIndex] = updatedImages;

      setInstructions((prevIns) =>
        prevIns.map((ins, i) =>
          i === instructionIndex ? { ...ins, images: updatedImages } : ins
        )
      );

      return newImages;
    });
  };

  const removeInstructionImage = (
    instructionIndex: number,
    imageIndex: number
  ) => {
    setInstructionImages((prev) => {
      const newImages = [...prev];
      const current = newImages[instructionIndex] || [];
      const updatedImages = current.filter((_, i) => i !== imageIndex);
      newImages[instructionIndex] = updatedImages;

      setInstructions((prevIns) =>
        prevIns.map((ins, i) =>
          i === instructionIndex ? { ...ins, images: updatedImages } : ins
        )
      );

      return newImages;
    });
  };

  const addTag = (tag: TagDto) => {
    setTags((prev) => [...prev, tag]);
  };

  const removeTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const getAllowedUnits = (ingredientTemplateId: string): Unit[] => {
    const found = templates?.find((t) => t.id === ingredientTemplateId);
    return found?.allowedUnits ?? [];
  };

  const submitRecipe = async () => {
    const payload: RecipeCreateRequest = {
      title,
      cookingTime,
      description,
      difficulty,
      servings,
      category,
      tags,
      ingredients,
      instructions,
      images: recipeImages,
    };

    try {
      const result = await recipeCreateService.createRecipe(payload);
      console.log("Recipe created successfully:", result);
      // TODO: redirect or notify success
    } catch (error) {
      console.error("Failed to create recipe:", error);
    }
  };

  return {
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
    ingredients,
    addIngredient,
    updateIngredient,
    removeIngredient,
    instructions,
    addInstruction,
    updateInstruction,
    removeInstruction,
    recipeImages,
    addRecipeImage,
    removeRecipeImage,
    instructionImages,
    addInstructionImage,
    removeInstructionImage,
    tags,
    addTag,
    removeTag,
    getAllowedUnits,
    submitRecipe,
  };
};

export default useCreateRecipe;
