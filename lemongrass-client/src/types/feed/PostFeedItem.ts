import type { Tag } from "../Tag";
import type { ImageResponse } from "../ImageResponse";
import type { AccountShortResponse } from "../AccountShortResponse";

export interface PostFeedItem {
  id: string;
  type: "POST";
  createAt: string;
  accountShortResponse: AccountShortResponse | null;
  imageResponses: ImageResponse[];
  isVerified: boolean | null;
  title: string;
  content: string;
  tags: Tag[] | null;
}
