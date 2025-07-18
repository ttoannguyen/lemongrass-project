import type { ImageResponse } from "../image/ImageResponse";
import type { AccountShortResponse } from "../AccountShortResponse";
import type { TagDto } from "../tag/TagDto";

export interface PostFeedItem {
  id: string;
  type: "POST";
  createAt: string;
  accountShortResponse: AccountShortResponse | null;
  imageResponses: ImageResponse[];
  isVerified: boolean | null;
  title: string;
  content: string;
  tags: TagDto[] | null;
}
