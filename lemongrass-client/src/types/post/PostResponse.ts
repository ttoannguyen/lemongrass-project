/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Account } from "../auth/auth.types";

export interface PostResponse {
  id: string;
  title: string;
  mainContents: string;
  contents: {
    text: string;
    contentTitle: string;
    displayOrder: number;
    urlImage: string;
  }[],
  visibility: "PUBLIC" | "PRIVATE" | "FRIENDS"; 
  author: Account;
  group: any | null; 
  recipe: any | null; 
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  lastModifiedDate: string;
  approved: boolean;
  isVerified: boolean | null;
  likeCount?: number;
  commentCount?: number;
}
