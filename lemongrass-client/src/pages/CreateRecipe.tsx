import { CategoryField } from "@/components/CreateRecipe/Fields/CategoryField";
import CookingTimeField from "@/components/CreateRecipe/Fields/CookingTimeField";
import DescriptionField from "@/components/CreateRecipe/Fields/DescriptionField";
import DifficultyField from "@/components/CreateRecipe/Fields/DifficultyField";
import RecipeImagesField from "@/components/CreateRecipe/Fields/RecipeImagesField";
import TagsField from "@/components/CreateRecipe/Fields/TagsField";
import TitleField from "@/components/CreateRecipe/Fields/TitleField";
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
