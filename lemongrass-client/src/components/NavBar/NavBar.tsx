import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AvatarNav from "./AvatarNav";
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
import { useTranslation } from "react-i18next";
import i18n from "@/utils/i18n";
import { TRANSLATION_KEYS } from "@/locales/translationKeys";
import { useNotifications } from "@/hooks/queries/useNotification";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

const NavBar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { notifications } = useWebSocket();
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const { account } = useAuth();
  const { data: dbNotifications = [] } = useNotifications(account?.username);
  const { notifications: wsNotifications } = useWebSocket();

  // Gộp lại: WS + DB
  const allNotifications = [...wsNotifications, ...dbNotifications];
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

  // const handleChangeLanguage = (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const selectedLanguage = event.target.value;
  //   i18n.changeLanguage(selectedLanguage);
  // };

  return (
    <div className="w-full bg-background text-text sticky top-0 z-50 shadow-xs">
      <div className="flex items-center justify-between px-4 py-2 max-w-screen-2xl mx-auto">
        <h1
          onClick={() => navigate("/")}
          className="text-xl md:text-3xl text-headline font-bold cursor-pointer py-2 ml-0 md:ml-28"
        >
          Lemongrass
        </h1>

        {isHome && showSearch && (
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

        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSearchOpen(!searchOpen)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>

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
                <PopoverContent className="w-80 p-0">
                  <div className="p-3 border-b">
                    <h4 className="font-semibold text-headline">Thông báo</h4>
                  </div>

                  <ScrollArea className="h-60 px-3 py-2">
                    {allNotifications.length > 0 ? (
                      allNotifications.map((notif, index) => (
                        <div key={index}>
                          <div className="p-2 rounded-md bg-muted text-sm">
                            {notif.message}
                          </div>
                          {index < allNotifications.length - 1 && (
                            <Separator className="my-2" />
                          )}
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-gray-500 px-2 py-4">
                        Không có thông báo
                      </p>
                    )}
                  </ScrollArea>
                </PopoverContent>
              </Popover>

              <Button
                variant={"outline"}
                className="bg-main border border-stroke !text-headline hover:bg-highlight"
                onClick={() => navigate("/new-recipe")}
              >
                {t(TRANSLATION_KEYS.recipe.create)}
              </Button>

              <AvatarNav />
              {/* <ModeToggle /> */}
            </div>
          ) : (
            <>
              <Button
                variant="outline"
                className="rounded-full"
                onClick={() => navigate("/register")}
              >
                {t(TRANSLATION_KEYS.auth.register)}
              </Button>
              <Button
                variant="default"
                className="border border-stroke bg-main text-headline hover:bg-highlight hover:text-headline"
                onClick={() => navigate("/login")}
              >
                {t(TRANSLATION_KEYS.auth.login)}
              </Button>
            </>
          )}
        </div>
      </div>

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
