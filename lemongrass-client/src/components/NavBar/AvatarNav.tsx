// import { useAuth } from "@/contexts/AuthContext";
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuSeparator,
//   DropdownMenuItem,
//   DropdownMenuLabel,
// } from "../ui/dropdown-menu";
// import { useNavigate } from "react-router-dom";
// import { TypographyP } from "../ui/TypographyP";
// import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
// import { authService } from "@/services/auth.service";
// import AvataProfile from "../Profile/AvataProfile";

// type Props = {
//   className?: string;
// };

// const AvatarNav = ({ className }: Props) => {
//   const { account, logout: clearContext } = useAuth();
//   const navigate = useNavigate();

//   const username = account?.username || "User";

//   const handleLogout = async () => {
//     try {
//       await authService.logout();
//     } catch (err) {
//       console.error("Logout failed:", err);
//     } finally {
//       localStorage.removeItem("authToken");
//       clearContext();
//       navigate("/");
//     }
//   };

//   return (
//     <div className={className}>
//       <DropdownMenu modal={false}>
//         <Tooltip>
//           <TooltipTrigger asChild>
//             <DropdownMenuTrigger asChild>
//               <div className="flex items-center justify-center cursor-pointer">
//                 <AvataProfile />
//               </div>
//             </DropdownMenuTrigger>
//           </TooltipTrigger>
//           <TooltipContent>
//             <p>{username}</p>
//           </TooltipContent>
//         </Tooltip>

//         <DropdownMenuContent className="mr-2 border border-secondary bg-background ">
//           <DropdownMenuLabel>
//             <TypographyP className="uppercase text-primary">
//               {username}
//             </TypographyP>
//           </DropdownMenuLabel>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             onSelect={() => navigate(`/profile/${account?.id}`)}
//             className="focus:bg-primary cursor-pointer focus:text-white"
//           >
//             Profile
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onSelect={() => navigate("/my-recipe")}
//             className="focus:bg-primary cursor-pointer focus:text-white"
//           >
//             My Recipe
//           </DropdownMenuItem>
//           <DropdownMenuItem
//             onSelect={() => navigate("/my-post")}
//             className="focus:bg-primary cursor-pointer focus:text-white"
//           >
//             My Post
//           </DropdownMenuItem>
//           <DropdownMenuSeparator />
//           <DropdownMenuItem
//             onSelect={handleLogout}
//             className="focus:bg-red-500/30 cursor-pointer focus:text-red-600"
//           >
//             Logout
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// };

// export default AvatarNav;

import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import AvataProfile from "../Profile/AvataProfile";
import ReusableDropdown from "../ReusableDropdown";
import { authService } from "@/services/auth.service";
import { isAccountHasRole } from "@/lib/utils";

const AvatarNav = () => {
  const { account, logout: clearContext } = useAuth();
  const navigate = useNavigate();
  const username = account?.username || "User";
  const isAdmin = isAccountHasRole(account, "ADMIN");
  const isStaff = isAccountHasRole(account, "STAFF");

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

  const items = [
    {
      label: "Profile",
      onClick: () => navigate(`/profile/${account?.id}`),
    },
    {
      label: "My Recipe",
      onClick: () => navigate("/my-recipe"),
    },
    {
      label: "My Post",
      onClick: () => navigate("/my-post"),
    },
    {
      label: "Admin Panel",
      onClick: () => navigate("/admin"),
      show: isAdmin,
      separatorBefore: true,
      className: "focus:bg-yellow-500/20 focus:text-yellow-700",
    },
    {
      label: "Staff Panel",
      onClick: () => navigate("/staff"),
      show: isStaff,
      separatorBefore: true,
      className: "focus:bg-yellow-500/20 focus:text-yellow-700",
    },
    {
      label: "Logout",
      onClick: handleLogout,
      separatorBefore: true,
      className: "focus:bg-red-500/30 focus:text-red-600",
    },
  ];

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="cursor-pointer">
          <ReusableDropdown
            header={username}
            trigger={
              <div className="flex items-center justify-center">
                <AvataProfile account={account ?? undefined} />
              </div>
            }
            items={items}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{username}</p>
      </TooltipContent>
    </Tooltip>
  );
};

export default AvatarNav;
