export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
}

export interface PagedResponse<T> {
  data: T[];
  pagination: Pagination;
}
