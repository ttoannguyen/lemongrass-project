import { useNavigate } from "react-router-dom";
import SearchInput from "../SearchInput/SearchInput";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AvatarNav from "./AvatarNav";
import { ModeToggle } from "../mode-toggle";
import { PickCreate } from "./PickCreate";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    // Outer full-width background
    // <div className="w-full bg-background text-text">
    <div className="w-full bg-background text-text sticky top-0 z-50 shadow-xs">
      {/* Inner centered container with spacing on sides */}
      <div className="flex items-center justify-between px-2 md:px-4 py-4  max-w-screen-2xl mx-auto">
        <h1
          onClick={() => navigate("/")}
          className="text-sm md:text-3xl font-bold cursor-pointer text-white bg-text rounded-sm h-10 px-1 mx-1"
        >
          Lemongrass
        </h1>
        {/* <div className="flex items-center justify-between max-w-240 mx-auto"> */}
        <SearchInput className="md:w-180  " />
        {/* </div> */}
        <div className="ml-auto">
          {!isLoggedIn ? (
            <Button
              variant={"ghost_ctm"}
              className="border-1"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          ) : (
            <div className="flex gap-2">
              <PickCreate />
              <AvatarNav />
              <ModeToggle />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
