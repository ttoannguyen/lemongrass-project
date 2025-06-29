import type { BaseResponse } from "../types/BaseResponse";
import api from "@/lib/axios";
import type { FeedItem } from "@/types/feed/FeedItem";

export const feedsService = {
  getFeeds: async (): Promise<FeedItem[]> => {
    const res = await api.get<BaseResponse<FeedItem[]>>("/feeds", {
      headers: {
        "x-auth_required": "false",
      },
    });
    return res.data.result;
  },
};
