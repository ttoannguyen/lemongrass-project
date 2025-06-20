import { useNavigate } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/authContext";
import AvatarNav from "./AvatarNav";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    // Outer full-width background
    <div className="w-full bg-background text-text">
      {/* Inner centered container with spacing on sides */}
      <div className="flex items-center justify-between px-4 md:px-8 py-4 gap-10 max-w-screen-2xl mx-auto">
        <h1 className="text-sm md:text-4xl md:ml-10 font-bold">Lemongrass</h1>
        <SearchInput className="md:w-200" />
        {/* <ModeToggle /> */}
        <div className="ml-auto">
          {!isLoggedIn ? (
            <Button variant={"ghost_ctm"} onClick={() => navigate("/login")}>
              Login
            </Button>
          ) : (
            <AvatarNav />
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
