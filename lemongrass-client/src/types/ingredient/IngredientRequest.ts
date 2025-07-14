export interface IngredientRequest {
  name: string;
  aliases: string[];
  allowedUnitIds: string[];
}

export interface IngredientUpdateRequest extends IngredientRequest {
  id: string;
}
