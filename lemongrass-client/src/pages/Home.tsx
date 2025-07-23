import RecipeListMain from "@/components/Recipes/RecipeListMain";
import HomeSearch from "@/components/SearchInput/HomeSearch";

const Home = () => {
  return (
    <div>
      <div className="relative bg-headline h-[250px] md:h-[300px] flex items-center justify-center">
        {/* Ảnh trang trí */}
        <img
          src="/src/assets/images/login_.png  " // thay đổi đường dẫn theo thực tế
          alt="Trang trí"
          className="absolute inset-0 w-full h-full object-cover "
        />

        {/* Search input nổi lên trên ảnh */}
        <div className="relative z-10 max-w-3xl w-full py-30 px-20 bg-main/20">
          <HomeSearch />
        </div>
      </div>
      <RecipeListMain />
    </div>
  );
};

export default Home;
