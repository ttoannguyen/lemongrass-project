import type { Visibility } from "../enums/visibility.enum";

export interface GroupResponse {
  groupId: string;
  description: string;
  ownerId: string;
  ownerName: string;
  ownerFirstname: string;
  ownerLastname: string;
  category: string;
  name: string;
  memberCount: number;
  coverImageUrl: string;
  rules: string;
  requirePostApproval: boolean;
  visibility: Visibility;
}
