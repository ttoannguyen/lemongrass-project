export interface BaseResponse<T = unknown> {
  code: number;
  result: T;
}
