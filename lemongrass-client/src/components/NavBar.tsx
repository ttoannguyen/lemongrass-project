import { useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput/SearchInput";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/authContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { account } = useAuth();
  return (
    <div className="flex items-center bg-background text-text p-4 gap-10">
      <h1 className="text-xl text-text md:text-3xl font-bold">Lemongrass</h1>
      <SearchInput />
      <p className="text-lg font-medium ml-auto mr-4 hidden md:block">
        This is a test.
      </p>

      <div className="flex items-center space-x-4">
        {!isLoggedIn ? (
          <Button variant={"ghost_ctm"} onClick={() => navigate("/login")}>
            Login
          </Button>
        ) : (
          <Avatar>
            <AvatarImage
              src={
                account?.profilePictureUrl
                  ? account.profilePictureUrl
                  : "https://res.cloudinary.com/didxuklgy/image/upload/v1750257521/27470351_7342052_xx4iiz.jpg"
              }
              width="640"
              height="640"
              alt="Avatar"
            />
            <AvatarFallback>ABC</AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default NavBar;
