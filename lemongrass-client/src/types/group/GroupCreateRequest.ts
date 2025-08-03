import type { Visibility } from "../enums/visibility.enum";

export interface GroupCreateRequest {
  name: string;
  description: string;
  category: string;
  coverImageUrl: string;
  rules?: string;
  requirePostApproval?: boolean;
  visibility: Visibility;
}
