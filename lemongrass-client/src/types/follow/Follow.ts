import type { FollowType } from "../enums/follow.enum";

export interface Follow {
  targetId: string;
  type: FollowType;
}
