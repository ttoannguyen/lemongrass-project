import type { Account } from "../auth/auth.types";

export interface PostReponse {
  id: string;
  createAt: string;
  accountShortResponse: Account | null;
  //   imageResponses: ImageResponse[];
  isVerified: boolean | null;
  title: string;
  content: string;
  //   tags: Tag[] | null;
}
