"use client";

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { Toaster, toast } from "sonner";
import SearchInput from "../SearchInput/SearchInput";
import { Button } from "../ui/button";
import { useAuth } from "@/contexts/AuthContext";
import AvatarNav from "./AvatarNav";
import { ModeToggle } from "../mode-toggle";
import { PickCreate } from "./PickCreate";
import wsClient from "@/lib/ws";

interface NotificationMessage {
  senderId: string;
  receiverId: string;
  message: string;
  targetType: string;
  targetId: string;
}

const NavBar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, account } = useAuth();
  const bellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoggedIn || !account?.id) {
      console.log(
        "[NavBar] Skipping WebSocket connection: Not logged in or no account ID"
      );
      return;
    }

    const connectAndSubscribe = async () => {
      try {
        console.log(
          "[NavBar] Attempting to connect WebSocket for user:",
          account.id
        );
        await wsClient.connect();
        console.log(
          "[NavBar] WebSocket connected, subscribing to notifications for user:",
          account.id
        );
        wsClient.subscribe(account.id, (message: NotificationMessage) => {
          console.log(
            "[WebSocket] Notification received for user:",
            account.id,
            message
          );
          if (message.message) {
            toast(message.message, {
              position: "top-right",
              style: {
                top: bellRef.current
                  ? bellRef.current.getBoundingClientRect().bottom + 10
                  : 60,
                right: bellRef.current
                  ? window.innerWidth -
                    bellRef.current.getBoundingClientRect().right +
                    10
                  : 10,
              },
              duration: 5000,
              richColors: true,
            });
          } else {
            console.error(
              "[WebSocket] Invalid notification format for user:",
              account.id,
              message
            );
            toast.error("Thông báo không hợp lệ");
          }
        });
      } catch (error) {
        console.error(
          "[WebSocket] Failed to connect for user:",
          account.id,
          error
        );
        toast.error("Không thể kết nối thông báo");
      }
    };

    connectAndSubscribe();

    return () => {
      console.log("[NavBar] Disconnecting WebSocket for user:", account.id);
      wsClient.disconnect();
    };
  }, [isLoggedIn, account?.id]);

  return (
    <div className="w-full bg-background text-text sticky top-0 z-50 shadow-xs">
      <div className="flex items-center justify-between px-2 md:px-4 py-4 max-w-screen-2xl mx-auto">
        <h1
          onClick={() => navigate("/")}
          className="text-sm md:text-3xl font-bold cursor-pointer text-white bg-text rounded-sm h-10 px-1 mx-1 flex items-center"
        >
          Lemongrass
        </h1>
        <SearchInput className="md:w-180" />
        <div className="ml-auto flex items-center gap-2">
          {!isLoggedIn ? (
            <Button
              variant={"ghost_ctm"}
              className="border-1"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
          ) : (
            <div className="flex gap-2 items-center">
              <PickCreate />
              <div
                ref={bellRef}
                className="cursor-pointer hover:text-gray-300 p-2"
                title="Notifications"
              >
                <Bell className="w-6 h-6" />
              </div>
              <AvatarNav />
              <ModeToggle />
            </div>
          )}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default NavBar;
