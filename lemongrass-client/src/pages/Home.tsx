import SectionRecipeList from "@/components/Home/SectionRecipeList";
import HomeSearch from "@/components/SearchInput/HomeSearch";
import { useRecipesQuery } from "@/hooks/queries/useRecipeQuery";

const Home = () => {
  const { data: recipes = [] } = useRecipesQuery();
  console.log(recipes);
  // const favoriteRecipes = recipes.slice(0, 4);
  const trendingRecipes = recipes.slice(4, 8);
  const highlyRatedRecipes = recipes.slice(8, 12);
  const latestRecipes = [...recipes].reverse().slice(0, 4);
  return (
    <div className="bg-white">
      <div className="relative bg-headline h-[250px] md:h-[300px] flex items-center justify-center overflow-hidden">
        <img
          src="/src/assets/images/flat-lay-corn-with-potatoes-tomatoes50.jpg"
          alt="Trang trí"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-10 w-full max-w-3xl px-6 sm:px-10 md:px-20 py-8 sm:py-10 md:py-12">
          <div className="bg-main/60 backdrop-blur-md rounded-xl shadow-lg p-6">
            <HomeSearch />
          </div>
        </div>
      </div>
      <div className="">
        <SectionRecipeList
          className="bg-main"
          textTitle="text-headline"
          title="Favorite Recipes"
          recipes={recipes}
        />

        <SectionRecipeList
          className="bg-headline"
          title="Trending Recipes"
          recipes={trendingRecipes}
        />

        <SectionRecipeList title="Highly Rated" recipes={highlyRatedRecipes} />

        <SectionRecipeList
          className="bg-headline"
          title="Latest Recipes"
          textTitle="text-highlight"
          recipes={latestRecipes}
        />
      </div>
    </div>
  );
};

export default Home;
