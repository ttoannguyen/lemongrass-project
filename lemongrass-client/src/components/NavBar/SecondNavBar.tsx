import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useCategoryGroupedByType } from "@/hooks/sort/useCategoryGroupedByType";
import { cn } from "@/lib/utils";
import { useIngredientTemplates } from "@/hooks/queries/useIngredientTemplate";
import { useTranslation } from "react-i18next";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";
import { useState } from "react";

const SecondNavBar = () => {
  const {t} = useTranslation()
  const { grouped } = useCategoryGroupedByType();
  const { data: ingredients } = useIngredientTemplates();
  const [showAll, setShowAll] = useState(false);

  const maxToShow = 5;
  const visibleIngredients = showAll ? ingredients : ingredients?.slice(0, maxToShow);
  const hasMore = ingredients && ingredients.length > maxToShow;

  return (
    <div className="relative w-full bg-headline shadow z-40 px-4 sm:px-48">
      <NavigationMenu className="w-full" viewport={false}>
        <NavigationMenuList className="flex flex-wrap gap-1">
          <NavigationMenuItem>
            <NavigationMenuLink
              className="group inline-flex h-9 items-center justify-center hover:bg-highlight text-main hover:text-headline px-4 py-2 text-sm font-medium"
              asChild
            >
              <Link to="/recipe">{t(TRANSLATION_KEYS.recipe.main)}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className="group inline-flex h-9 items-center justify-center hover:bg-highlight text-main hover:text-headline px-4 py-2 text-sm font-medium"
              asChild
            >
              <Link to="/recipe/quick-and-easy">{t(TRANSLATION_KEYS.navigation.quickAndEasy)}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink
              className="group inline-flex h-9 items-center justify-center hover:bg-highlight text-main hover:text-headline px-4 py-2 text-sm font-medium"
              asChild
            >
              <Link to="/community">{t(TRANSLATION_KEYS.navigation.community)}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {Object.entries(grouped).map(([type, categories]) => (
            <NavigationMenuItem key={type} className="relative">
              <NavigationMenuTrigger className="capitalize text-main data-[state=open]:bg-highlight data-[state=open]:text-headline">
                {t(`navigation.${type.toLowerCase()}`)}
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute left-0 top-full w-screen sm:w-auto sm:left-auto sm:right-0 bg-white shadow-md z-50">
                <ul className="grid gap-1 p-2 w-full sm:w-56">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <NavigationMenuLink asChild>
                        <Link
                          to={`/recipe/category/${cat.id}`}
                          className="block px-2 py-1 text-sm text-headline hover:underline hover:font-bold"
                        >
                          {cat.name}
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}

          <NavigationMenuItem className="relative">
      <NavigationMenuTrigger className="text-main data-[state=open]:bg-highlight data-[state=open]:text-headline">
        {t(`navigation.ingredient`)}
      </NavigationMenuTrigger>

      <NavigationMenuContent className="absolute left-0 top-full w-screen sm:w-72 sm:right-0 bg-white shadow-md z-50 rounded-md border">
        <ul className="grid gap-1 p-2 max-h-[350px] overflow-y-auto">
          {visibleIngredients?.map((component) => (
            <li key={component.name}>
              <NavigationMenuLink asChild>
                <Link
                  to={`/recipe/ingredient/${component.id}`}
                  className={cn(
                    "block select-none space-y-1 rounded-md p-3 transition-colors hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <div className="text-sm font-medium truncate">
                    {component.name}
                  </div>
                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                    {component.createdBy}
                  </p>
                </Link>
              </NavigationMenuLink>
            </li>
          ))}

          {hasMore && (
            <li className="mt-1">
              <button
                onClick={() => setShowAll((prev) => !prev)}
                className="w-full text-sm text-center text-blue-500 hover:underline"
              >
                {showAll ? "Thu gọn" : "Xem thêm"}
              </button>
            </li>
          )}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default SecondNavBar;
