export interface UnitResponse {
  id: string;
  name: string;
  minValue: number;
  stepSize: number;

  createdBy?: string;
  createdDate?: string; // ISO string
  lastModifiedBy?: string;
  lastModifiedDate?: string;
}
