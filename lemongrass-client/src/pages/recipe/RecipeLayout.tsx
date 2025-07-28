import RecipeBreadcrumbBar from "@/components/breadcrum/RecipeBreadcrumbBar";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

const RecipeLayout = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isCategoryPage = pathname.includes("/category/");

  return (
    <div className="bg-background">
      <div className="relative w-full h-40 md:h-60 flex items-center bg-headline justify-center">
        <img
          src="/src/assets/images/food-vegetable-colorful-background-tasty-fresh-vegetables-wooden-table-top-view-with-copy-space.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <p className="relative z-10 text-center text-2xl md:text-4xl font-extrabold tracking-tight text-highlight">
          {isCategoryPage
            ? t(TRANSLATION_KEYS.recipe.categoryTitle)
            : t(TRANSLATION_KEYS.recipe.title)}
        </p>
      </div>

      <div className="w-250 mx-auto">
        <RecipeBreadcrumbBar />
        <Outlet />
      </div>
    </div>
  );
};

export default RecipeLayout;
