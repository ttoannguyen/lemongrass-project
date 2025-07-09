import { FeedPage } from "@/components/MainFeeds/Feeds";
// import { PickCreate } from "@/components/Posts/";

const Home = () => {
  return (
    <div className="flex bg-[#f6f6f6] min-h-screen">
      <div className="mx-auto w-full max-w-2xl px-4 py-6">
        <FeedPage />
      </div>
    </div>
  );
};

export default Home;
