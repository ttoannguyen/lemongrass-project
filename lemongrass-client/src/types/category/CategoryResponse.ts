import type { Base } from "../Base";

export interface CategoryResponse extends Base {
  id: string;
  name: string;
  type: string;
}
