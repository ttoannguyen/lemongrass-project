// type Props = {};

import { FeedPage } from "@/components/MainFeeds/Feeds";
// import { useIngredientUnit } from "@/hooks/useIngredientUnit";

const Home = () => {
  // const { data: units, loading, error, refetch } = useIngredientUnit();
  // console.log(units);
  return (
    <div className="flex bg-[#f6f6f6]">
      <FeedPage className="md:min-w-200  mx-auto" />
    </div>
  );
};

export default Home;
