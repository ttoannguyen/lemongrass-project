import { CategoryField } from "@/components/CreateRecipe/CategoryField";
import CookingTimeField from "@/components/CreateRecipe/CookingTimeField";
import DescriptionField from "@/components/CreateRecipe/DescriptionField";
import DifficultyField from "@/components/CreateRecipe/DifficultyField";
import RecipeImagesField from "@/components/CreateRecipe/RecipeImagesField";
import TagsField from "@/components/CreateRecipe/TagsField";
import TitleField from "@/components/CreateRecipe/TitleField";
import { FormProvider, useForm } from "react-hook-form";

const CreateRecipe = () => {
  const methods = useForm();
  const onSubmit = (data: unknown) => {
    console.log(data);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <TitleField />
        <DescriptionField />
        <TagsField />
        <RecipeImagesField />
        <DifficultyField />
        <CookingTimeField />
        <CategoryField />
        <button type="submit">Create Recipe</button>
      </form>
    </FormProvider>
  );
};

export default CreateRecipe;
