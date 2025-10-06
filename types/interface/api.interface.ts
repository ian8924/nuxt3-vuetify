export interface ApiRequestPagination {
  page?: number
  size?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface ApiResponseList<T> {
  content: T
  empty: boolean
  first: boolean
  last: boolean
  number: number
  numberOfElements: number
  pageable: {
    pageNumber: number
    pageSize: number
    sort: {
      sorted: boolean
      empty: boolean
      unsorted: boolean
    }
    offset: number
  }
  size: number
  totalElements: number
  totalPages: number
}

export interface ApiResponseSingle<T> {
  data: T
  success: boolean
  message: string
}
