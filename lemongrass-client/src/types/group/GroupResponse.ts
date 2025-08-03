import type { Visibility } from "../enums/visibility.enum";

export interface GroupResponse {
  groupId: string;
  description: string;
  ownerId: string;
  category: string;
  coverImageUrl: string;
  rules: string;
  requirePostApproval: boolean;
  visibility: Visibility;
}
