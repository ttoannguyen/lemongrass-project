import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AvatarNav from "./AvatarNav";
import { ModeToggle } from "../mode-toggle";
// import { PickCreate } from "./PickCreate";
import { useWebSocket } from "@/providers/WebSocketProvider";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Bell, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchInput from "../searchInput/SearchInput";

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { notifications } = useWebSocket();
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    if (!notifications || notifications.length === 0) return;

    const latest = notifications[notifications.length - 1];
    toast.success(latest.message);
  }, [notifications]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowSearch(scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showSearch]);

  return (
    <div className="w-full bg-background text-text sticky top-0 z-50 shadow-xs">
      <div className="flex items-center justify-between px-4 py-2 max-w-screen-2xl mx-auto">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl md:text-3xl text-headline font-bold cursor-pointer py-2 ml-0 md:ml-28"
        >
          Lemongrass
        </h1>

        {/* Thanh tìm kiếm trên PC */}
        {(isHome ? showSearch : true) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="hidden md:flex flex-1 mx-4"
          >
            <SearchInput />
          </motion.div>
        )}

        {/* Nút search trên mobile */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

        {/* Action bên phải */}
        <div className="flex items-center gap-2 ml-auto">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5 text-stroke" />
                    {notifications?.length > 0 && (
                      <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full" />
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-headline">Thông báo</h4>
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

              <Button
                variant={"outline"}
                className="bg-main border border-stroke !text-headline hover:bg-highlight"
                onClick={() => navigate("/account/new-recipe")}
              >
                Create Recipe
              </Button>
              {/* <PickCreate /> */}
              <AvatarNav />
              <ModeToggle />
            </div>
          ) : (
            <Button
              variant="default"
              className="rounded-full"
              onClick={() => navigate("/login")}
            >
              Đăng nhập
            </Button>
          )}
        </div>
      </div>

      {/* Thanh tìm kiếm mobile */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-2">
          <Input
            placeholder="Tìm công thức..."
            className="w-full rounded-full border-gray-300 dark:border-gray-700"
          />
        </div>
      )}
    </div>
  );
};

export default NavBar;
