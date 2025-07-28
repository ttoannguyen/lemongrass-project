import { useLocation, useParams } from "react-router-dom";
import BreadcrumbBar from "./BreadcrumBar";
import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import { useRecipeDetail } from "@/hooks/queries/useRecipeDetailQuery";
import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";

const RecipeBreadcrumbBar = () => {
  const location = useLocation();
  const { categoryId, recipeId } = useParams();
  const { data: categories = [] } = useCategoryQuery();
  const {t} = useTranslation()

  console.log(categoryId, recipeId);
  // Nếu đang ở trang chi tiết công thức, fetch công thức
  const { data: recipe } = useRecipeDetail(recipeId ?? "");

  const items = [
    { label: t(TRANSLATION_KEYS.navigation.home), href: "/" },
    { label: t(TRANSLATION_KEYS.navigation.recipe), href: "/recipe" },
  ];

  // --- Category page ---
  if (location.pathname.startsWith("/recipe/category/") && categoryId) {
    const category = categories.find((c) => c.id === categoryId);
    items.push({
      label: category ? category.name : "Category",
      href: "",
    });
  }

  // --- Recipe Detail page ---
  if (location.pathname.startsWith("/recipe/") && recipeId && recipe) {
    if (recipe.categories?.length > 0) {
      const mainCategory = recipe.categories[0];
      items.push({
        label: mainCategory.name,
        href: `/recipe/category/${mainCategory.id}`,
      });
    }
    items.push({ label: recipe.title, href: "" });
  }

  return <BreadcrumbBar items={items} />;
};

export default RecipeBreadcrumbBar;
