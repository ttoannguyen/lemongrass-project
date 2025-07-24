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

const SecondNavBar = () => {
  const { grouped } = useCategoryGroupedByType();
  const { data: ingredients } = useIngredientTemplates();

  return (
    <div className="px-48 w-full bg-headline shadow z-40 transition-all duration-300">
      <NavigationMenu viewport={false}>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="group inline-flex h-9 w-max items-center justify-center  hover:bg-highlight text-main hover:text-headline px-4 py-2 text-sm font-medium"
              asChild
            >
              <Link to="/recipe">Recipes</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              className="group inline-flex h-9 w-max items-center justify-center  hover:bg-highlight text-main hover:text-headline px-4 py-2 text-sm font-medium"
              asChild
            >
              <Link to="/quick-and-easy">Quick & Easy</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          {Object.entries(grouped).map(([type, categories]) => (
            <NavigationMenuItem key={type}>
              <NavigationMenuTrigger className="capitalize text-main data-[state=open]:bg-highlight data-[state=open]:text-headline">
                {type.toLowerCase()}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-56 gap-1 p-2">
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
          <NavigationMenuItem>
            <NavigationMenuTrigger className="data-[state=open]:bg-highlight text-main data-[state=open]:text-headline">
              Ingredient
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-3 p-4 md:w-[250px] md:grid-cols-2 lg:w-[300px]">
                {ingredients?.map((component) => (
                  <li key={component.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        className={cn(
                          "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        )}
                        to={component.name}
                      >
                        <div className="text-sm font-medium leading-none">
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
          {/* <NavigationMenuItem>
            <NavigationMenuLink
              className="group inline-flex h-9 w-max items-center justify-center  hover:bg-highlight text-main hover:text-headline px-4 py-2 text-sm font-medium"
              asChild
            >
              <Link to="/docs">Dinner</Link>
            </NavigationMenuLink>
          </NavigationMenuItem> */}
          
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default SecondNavBar;
