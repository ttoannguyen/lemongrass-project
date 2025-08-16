/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Account } from "../auth/auth.types";
import type { ImageResponse } from "../image/ImageResponse";

export interface PostResponse {
  id: string;
  title: string;
  contents: {
    text: string;
    contentTitle: string;
    displayOrder: number;
    imageResponse: ImageResponse;

  }[],
  visibility: "PUBLIC" | "PRIVATE" | "FRIENDS"; // thêm nếu có nhiều loại
  author: Account;
  group: any | null; // nếu có kiểu cụ thể thì thay any
  recipe: any | null; // nếu có kiểu cụ thể thì thay any
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  lastModifiedDate: string;
  approved: boolean;
  isVerified: boolean | null;
  likeCount?: number;
  commentCount?: number;
}
