import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { recipeSchema } from "@/schemas/recipe";
import { createRecipe } from "@/api/recipes";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import TitleForm from "./TitleForm";
import DescriptionForm from "./DescriptionForm";
import DurationForm from "./DurationForm";
import DifficultyForm from "./DifficultyForm";
import IngredientsForm from "./IngredientsForm";
import InstructionsForm from "./InstructionsForm";
import TagsForm from "./TagsForm";
import CategoryForm from "./CategoryForm";
import ThumbnailForm from "./ThumbnailForm";
import SubmitButton from "./SubmitButton";

export default function CreateRecipe() {
  const methods = useForm({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      title: "",
      description: "",
      duration: 0,
      difficulty: "EASY",
      ingredients: [],
      instructions: [],
      tags: [],
      category: "OTHER",
      thumbnail: null,
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (values: any) => {
    try {
      const recipe = await createRecipe(values);
      toast.success("Recipe created");
      navigate(`/recipes/${recipe.id}`);
    } catch {
      toast.error("Failed to create recipe");
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
        <TitleForm />
        <DescriptionForm />
        <DurationForm />
        <DifficultyForm />
        <IngredientsForm />
        <InstructionsForm />
        <TagsForm />
        <CategoryForm />
        <ThumbnailForm />
        <SubmitButton />
      </form>
    </FormProvider>
  );
}
