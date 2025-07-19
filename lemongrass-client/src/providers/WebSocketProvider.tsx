/* eslint-disable react-refresh/only-export-components */
"use client";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import wsClient from "@/lib/ws";
import { toast } from "sonner";

export interface NotificationMessage {
  senderId: string;
  receiverId: string;
  message: string;
  targetType: string;
  targetId: string;
}

const WebSocketContext = createContext<{
  notifications: NotificationMessage[];
}>({ notifications: [] });

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { isLoggedIn, account } = useAuth();
  const isConnectedRef = useRef(false);
  const [notifications, setNotifications] = useState<NotificationMessage[]>([]);

  useEffect(() => {
    if (!isLoggedIn || !account?.id || isConnectedRef.current) return;

    const connect = async () => {
      try {
        await wsClient.connect();
        isConnectedRef.current = true;
        wsClient.subscribe(account.id, (message: NotificationMessage) => {
          console.log("New message", message);
          setNotifications((prev) => [...prev, message]);
          //   toast(message.message, { position: "top-right" });
        });
      } catch (err) {
        console.error("[WebSocket] Connection failed", err);
        toast.error("Không thể kết nối WebSocket.");
      }
    };

    connect();

    return () => {
      if (isConnectedRef.current) {
        wsClient.disconnect();
        isConnectedRef.current = false;
      }
    };
  }, [isLoggedIn, account?.id]);

  return (
    <WebSocketContext.Provider value={{ notifications }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
