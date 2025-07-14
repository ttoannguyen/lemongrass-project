export interface IngredientResponse {
  id: string;
  name: string;
  aliases: string[];
  allowedUnits: {
    id: string;
    name: string;
    minValue: number;
    stepSize: number;
  }[];

  createdBy?: string;
  createdDate?: string; // ISO string
  lastModifiedBy?: string;
  lastModifiedDate?: string;
}
