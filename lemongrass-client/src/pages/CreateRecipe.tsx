import CreateRecipeForm from "@/components/Recipes/CreateRecipe";
import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import { useIngredientTemplates } from "@/hooks/queries/useIngredientTemplate";

const CreateRecipe = () => {
  const { data: categories } = useCategoryQuery();
  const { data: templates } = useIngredientTemplates();

  if (!categories || !templates) return <div>Loading...</div>;

  return (
    <>
      <CreateRecipeForm categories={categories} templates={templates} />
    </>
  );
};

export default CreateRecipe;
