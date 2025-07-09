import CreateRecipeForm from "@/components/Recipes/CreateRecipe";
import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import { useIngredientTemplates } from "@/hooks/queries/useIngredientTemplate";
import { Link } from "react-router-dom";

const CreateRecipe = () => {
  const { data: categories } = useCategoryQuery();
  const { data: templates } = useIngredientTemplates();

  if (!categories || !templates) return <div>Loading...</div>;

  return (
    <>
      <div className="flex items-center justify-between px-2 md:px-4 py-4  max-w-screen-2xl mx-auto">
        <Link
          to={"/"}
          className="text-sm md:text-3xl font-bold cursor-pointer text-text rounded-sm h-10 px-1 mx-1"
        >
          Lemongrass
        </Link>
      </div>
      <CreateRecipeForm categories={categories} templates={templates} />
    </>
  );
};

export default CreateRecipe;
