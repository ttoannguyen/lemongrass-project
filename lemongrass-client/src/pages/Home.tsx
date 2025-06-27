// type Props = {};

import { FeedPage } from "@/components/MainFeeds/Feeds";
import { useIngredientUnit } from "@/hooks/useIngredientUnit";

const Home = () => {
  const { data: units, loading, error, refetch } = useIngredientUnit();
  console.log(units);
  return (
    <div className="flex ">
      <FeedPage className="md:min-w-200 bg-amber-400 mx-auto" />
    </div>
  );
};

export default Home;
