import LeftSidebar from "@/components/community/LeftSidebar";
import RightSidebar from "@/components/community/RightSidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CommunityLayout = () => {
  const { isLoggedIn, account } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="h-[calc(100vh-110px)] overflow-hidden bg-headline flex items-center justify-center px-4">
        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 items-center gap-8  rounded-xl p-10 ">
          {/* Text section */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold text-highlight">
              Join the Conversation!
            </h1>
            <p className="text-main">
              Explore groups, chat with members, and share your ideas. Create an
              account or log in to start connecting with the community.
            </p>
            <div className="flex gap-4 pt-2">
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-button hover:border-button border"
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" size="lg">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center">
            <img
              src="/src/assets/images/top-view-assortment-fresh-vegetables-table.jpg"
              alt="Join Community"
              className="max-w-md w-full rounded-lg"
            />
          </div>
        </div>
      </div>
    );
  }

  // Logged in layout (scroll vẫn bình thường)
  return (
    <div className=" flex bg-background gap-4 w-full max-w-[1440px] mx-auto">
      <LeftSidebar />
      <main className="flex-1">
        <Outlet context={{ account }} />
      </main>
      <RightSidebar />
    </div>
  );
};

export default CommunityLayout;
