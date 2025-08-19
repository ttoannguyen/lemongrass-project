import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

export interface Notification {
  id: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export const useNotifications = (username: string | undefined) => {
  return useQuery<Notification[]>({
    queryKey: ["notifications", username],
    queryFn: async () => {
      if (!username) return [];
      const res = await api.get(`/notification`);
      return res.data;
    },
    enabled: !!username,
  });
};
