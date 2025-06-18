import { useNavigate } from "react-router-dom";
// import { ModeToggle } from "./mode-toggle";
import SearchInput from "./SearchInput/SearchInput";
import { Button } from "./ui/button";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center bg-background text-text p-4 gap-4">
      <h1 className="text-xl text-text md:text-3xl font-bold">Lemongrass</h1>
      <SearchInput />
      <p className="text-lg font-medium ml-auto mr-4 hidden md:block">
        This is a test.
      </p>

      <div className="flex items-center space-x-4">
        <Button variant={"ghost_ctm"} onClick={() => navigate("/login")}>
          Login
        </Button>
        {/* <ModeToggle /> */}
      </div>
    </div>
  );
};

export default NavBar;
