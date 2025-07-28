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

const SecondNavBar = () => {
  const {t} = useTranslation()
  const { grouped } = useCategoryGroupedByType();
  const { data: ingredients } = useIngredientTemplates();

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
              <Link to="/quick-and-easy">{t(TRANSLATION_KEYS.navigation.quickAndEasy)}</Link>
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
            <NavigationMenuContent className="absolute left-0 top-full w-screen sm:w-[300px] sm:left-auto sm:right-0 bg-white shadow-md z-50">
              <ul className="grid gap-3 p-4 grid-cols-1 sm:grid-cols-2">
                {ingredients?.map((component) => (
                  <li key={component.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground"
                        )}
                        to={component.name}
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
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default SecondNavBar;
