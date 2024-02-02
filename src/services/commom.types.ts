export type Pagination = {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  totalPages: number
}
export type PaginationResponse<T> = {
  items: T
  pagination: Pagination
}
