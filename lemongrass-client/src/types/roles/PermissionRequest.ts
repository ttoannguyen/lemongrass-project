import type { Base } from "../Base";

export interface PermissionRequest extends Base {
  name: string;
  description: string;
}

export interface PermissionUpdateRequest extends Base {
  name: string;
  description: string;
}
