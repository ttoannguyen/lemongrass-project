import type { Unit } from "../units/Unit";

export interface IngredientTemplateResponse {
  id: string;
  name: string;
  aliases: number;
  allowedUnits: Unit[];
}
