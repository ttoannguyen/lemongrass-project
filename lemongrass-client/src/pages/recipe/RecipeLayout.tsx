import { TRANSLATION_KEYS } from "@/locales/translationKeys";
import { useTranslation } from "react-i18next";
import { Outlet, useLocation } from "react-router-dom";

const RecipeLayout = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation();

  const isCategoryPage = pathname.includes("/category/");

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="relative w-full h-48 sm:h-64 md:h-80 flex items-center justify-center overflow-hidden">
        <img
          src="/src/assets/images/food-vegetable-colorful-background-tasty-fresh-vegetables-wooden-table-top-view-with-copy-space.jpg"
          alt="Recipe Header"
          className="absolute inset-0 w-full h-full object-cover opacity-70 transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        <h1 className="relative z-10 text-center text-xl sm:text-4xl md:text-3xl font-bold tracking-tight text-highlight drop-shadow-lg">
          {/* {isCategoryPage
            ? t(TRANSLATION_KEYS.recipe.categoryTitle)
            : t(TRANSLATION_KEYS.recipe.title)} */}
            Dễ dàng tìm kiếm các công thức nấu ăn yêu thích của bạn
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Outlet />
      </div>
    </div>
  );
};

export default RecipeLayout;
