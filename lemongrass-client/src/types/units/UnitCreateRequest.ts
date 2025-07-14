export interface UnitCreateRequest {
  name: string;
  minValue: number;
  stepSize: number;
}

export interface UnitUpdateRequest extends UnitCreateRequest {
  id: string;
}
