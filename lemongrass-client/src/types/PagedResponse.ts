export type PagedResponse<T> = {
  content: T[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
};
