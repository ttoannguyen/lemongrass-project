import type { GROUPROLE } from "../enums/grouprole.enum";
import type { JOINSTATUS } from "../enums/joinstatus.enum";

export interface GroupJoinResponse {
  groupId: string;
  groupName: string;
  groupRole: GROUPROLE;
  status: JOINSTATUS;
  joined: boolean;
  pendingApproval: boolean;
}
