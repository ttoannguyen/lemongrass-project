import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { TypographyP } from "../ui/TypographyP";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { authService } from "@/services/auth.service";

type Props = {
  className?: string;
};

const AvatarNav = ({ className }: Props) => {
  const { account, logout: clearContext } = useAuth();
  const navigate = useNavigate();

  const username = account?.username || "User";
  const avatarFallback = username.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("authToken");
      clearContext();
      navigate("/");
    }
  };

  return (
    <div className={className}>
      <DropdownMenu modal={false}>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-center cursor-pointer">
                <Avatar className="h-6 w-6 md:w-10 md:h-10">
                  <AvatarImage
                    src={
                      account?.profilePictureUrl
                        ? account.profilePictureUrl
                        : "https://res.cloudinary.com/didxuklgy/image/upload/v1750257521/27470351_7342052_xx4iiz.jpg"
                    }
                    alt="Avatar"
                    className="object-cover"
                  />
                  <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
              </div>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>{username}</p>
          </TooltipContent>
        </Tooltip>

        <DropdownMenuContent className="mr-2 border border-secondary bg-background ">
          <DropdownMenuLabel>
            <TypographyP className="uppercase text-primary">
              {username}
            </TypographyP>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => navigate(`/profile/${account?.id}`)}
            className="focus:bg-primary cursor-pointer focus:text-white"
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => navigate("/my-recipe")}
            className="focus:bg-primary cursor-pointer focus:text-white"
          >
            My Recipe
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={() => navigate("/my-post")}
            className="focus:bg-primary cursor-pointer focus:text-white"
          >
            My Post
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={handleLogout}
            className="focus:bg-red-500/30 cursor-pointer focus:text-red-600"
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AvatarNav;
