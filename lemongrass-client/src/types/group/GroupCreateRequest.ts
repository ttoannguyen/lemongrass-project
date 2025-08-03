import type { Visibility } from "../enums/visibility.enum";

export interface GroupCreateRequest {
  name: string;
  description: string;
  requirePostApproval?: boolean;
  visibility: Visibility;
}
