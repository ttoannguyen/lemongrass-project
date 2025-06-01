import { Button } from "@radix-ui/themes";
import ToggleThemeButton from "./ToggleThemeButton ";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="py-2 bg-white dark:bg-black shadow">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        <Link to="/" className="text-lg font-semibold ml-20">
          Lemongrass
        </Link>

        <div className="flex gap-2">
          <ToggleThemeButton className="ml-3" />
          <Button
            onClick={() => navigate("login")}
            variant="outline"
            className="!cursor-pointer"
          >
            Đăng ký
          </Button>
          <Button
            onClick={() => navigate("register")}
            variant="solid"
            className="!cursor-pointer"
          >
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
