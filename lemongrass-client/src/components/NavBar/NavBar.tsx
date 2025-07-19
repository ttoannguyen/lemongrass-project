// "use client";

// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import SearchInput from "../SearchInput/SearchInput";
// import { Button } from "../ui/button";
// import { useAuth } from "@/contexts/AuthContext";
// import AvatarNav from "./AvatarNav";
// import { ModeToggle } from "../mode-toggle";
// import { PickCreate } from "./PickCreate";
// import { useWebSocket } from "@/providers/WebSocketProvider";
// import { toast } from "sonner";
// import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
// import type { CategoryResponse } from "@/types/category/CategoryResponse";

// const NavBar = () => {
//   const navigate = useNavigate();
//   const { isLoggedIn } = useAuth();
//   const { notifications } = useWebSocket();
//   const { data: categories } = useCategoryQuery();

//   useEffect(() => {
//     if (!notifications || notifications.length === 0) return;

//     const latest = notifications[notifications.length - 1];

//     toast.success(latest.message + " hehe");
//   }, [notifications]);

//   const groupedCategories = categories?.reduce(
//     (acc, category: CategoryResponse) => {
//       acc[category.type] = acc[category.type] || [];
//       acc[category.type].push(category);
//       return acc;
//     },
//     { CUISINE: [], OCCASION: [], MEAL_TIME: [] } as Record<
//       string,
//       CategoryResponse[]
//     >
//   );

//   return (
//     <div className="w-full flex-row bg-background text-text sticky top-0 z-50 shadow-xs">
//       <div className="flex items-center justify-between px-2 md:px-4 py-4 max-w-screen-2xl mx-auto">
//         <h1
//           onClick={() => navigate("/")}
//           className="text-sm md:text-3xl font-bold cursor-pointer text-white bg-text rounded-sm h-10 px-1 mx-1 flex items-center"
//         >
//           Lemongrass
//         </h1>
//         <SearchInput className="md:w-180" />
//         <div className="ml-auto flex items-center gap-2">
//           {!isLoggedIn ? (
//             <Button
//               variant={"ghost_ctm"}
//               className="border-1"
//               onClick={() => navigate("/login")}
//             >
//               Login
//             </Button>
//           ) : (
//             <div className="flex gap-2 items-center">
//               <PickCreate />
//               <AvatarNav />
//               <ModeToggle />
//             </div>
//           )}
//         </div>
//       </div>
//       <div>hello</div>
//     </div>
//   );
// };

// export default NavBar;

"use client";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AvatarNav from "./AvatarNav";
import { ModeToggle } from "../mode-toggle";
import { PickCreate } from "./PickCreate";
import { useWebSocket } from "@/providers/WebSocketProvider";
import { toast } from "sonner";
import { useCategoryQuery } from "@/hooks/queries/useCategoryQuery";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import type { CategoryResponse } from "@/types/category/CategoryResponse";
import { Link } from "react-router-dom";

// Cập nhật interface để khớp với dữ liệu API
// interface CategoryResponse {
//   id: string;
//   name: string;
//   type: "CUISINE" | "OCCASION" | "MEAL_TIME"; // Sửa MEAL_TYPE thành MEAL_TIME
// }

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { notifications } = useWebSocket();
  const { data: categories } = useCategoryQuery();
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (!notifications || notifications.length === 0) return;

    const latest = notifications[notifications.length - 1];
    toast.success(latest.message + " hehe");
  }, [notifications]);

  // Nhóm danh mục theo type
  const validTypes = ["CUISINE", "OCCASION", "MEAL_TYPE"];
  const groupedCategories = categories?.reduce(
    (acc: Record<string, CategoryResponse[]>, category: CategoryResponse) => {
      if (validTypes.includes(category.type)) {
        acc[category.type] = acc[category.type] || [];
        acc[category.type].push(category);
      }
      return acc;
    },
    { CUISINE: [], OCCASION: [], MEAL_TYPE: [] } as Record<
      string,
      CategoryResponse[]
    >
  );

  return (
    <div className="w-full bg-background text-text sticky top-0 z-50 shadow-sm">
      {/* Thanh điều hướng chính */}
      <div className="flex items-center justify-between px-4 py-3 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl md:text-2xl font-bold cursor-pointer bg-gradient-to-r from-green-500 to-lime-500 text-white rounded-md px-3 py-2 transition hover:scale-105"
        >
          Lemongrass
        </h1>

        {/* Thanh tìm kiếm (ẩn trên mobile, hiện khi nhấp biểu tượng) */}
        <div className="hidden md:flex flex-1 mx-4 max-w-md">
          <Input
            placeholder="Tìm công thức..."
            className="w-full rounded-full border-gray-300 dark:border-gray-700"
          />
        </div>
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Nút bên phải */}
        <div className="flex items-center gap-2 ml-auto">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              {/* Nút thông báo */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications?.length > 0 && (
                      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold">Thông báo</h4>
                    {notifications?.length > 0 ? (
                      notifications.map((notif, index) => (
                        <div
                          key={index}
                          className="p-2 rounded-md bg-muted text-sm"
                        >
                          {notif.message}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500">
                        Không có thông báo mới
                      </p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>

              <PickCreate />
              <AvatarNav />
              <ModeToggle />
            </div>
          ) : (
            <Button
              variant="outline"
              className="rounded-full border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>

      {/* Thanh tìm kiếm trên mobile */}
      {searchOpen && (
        <div className="md:hidden px-4 py-2">
          <Input
            placeholder="Tìm công thức..."
            className="w-full rounded-full border-gray-300 dark:border-gray-700"
          />
        </div>
      )}

      {/* Menu danh mục sử dụng NavigationMenu */}
      {categories && groupedCategories && (
        <div className="flex  border-gray-200 dark:border-gray-700">
          <NavigationMenu className="mx-50">
            <NavigationMenuList className="flex justify-center max-w-screen-2xl mx-auto">
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm md:text-base rounded-none h-10 ">
                  Danh mục
                </NavigationMenuTrigger>
                <NavigationMenuContent className="bg-white rounded-none! border-none">
                  <ul className="grid w-[300px] gap-3 md:w-[500px] md:grid-cols-3 lg:w-[600px]">
                    {["CUISINE", "OCCASION", "MEAL_TYPE"].map((type) => (
                      <li key={type}>
                        <div className="font-semibold text-sm mb-2">
                          {type === "CUISINE"
                            ? "Ẩm thực"
                            : type === "OCCASION"
                            ? "Dịp"
                            : "Bữa ăn"}
                        </div>
                        {groupedCategories?.[type]?.length > 0 ? (
                          groupedCategories[type].map((category) => (
                            <NavigationMenuLink
                              key={category.id}
                              asChild
                              className="hover:bg-white bg-white hover:underline"
                            >
                              <Link
                                to={`/recipes?category=${category.id}`}
                                className={cn(
                                  navigationMenuTriggerStyle(),
                                  "w-full justify-start text-sm"
                                )}
                              >
                                {category.name}
                              </Link>
                            </NavigationMenuLink>
                          ))
                        ) : (
                          <span className="text-sm text-gray-500">
                            Không có danh mục
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      )}
    </div>
  );
};

export default NavBar;
