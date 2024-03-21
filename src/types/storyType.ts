import { Category } from './categoryType'
import { UserPublic } from './userType'

export interface StoriesList {
  id: number
  name: string
  slug: string
  AuthorId: number
  UserId: number
  access: number
  type: number
  avatar: string
  createdAt: string | Date
  descriptions: string
  followCount: number
  likeCount: number
  viewCount: number
  isFull: boolean
  lastChapter: number
  updatedAt: string | Date
  User: UserPublic
  Categories: Category[]
}
export interface StoriesResponse {
  curPage: number
  perPage: number
  total: number
  data: StoriesList[]
}

export interface StoriesQuery {
  page: number
  perPage?: number
  type: number
  isFull: boolean | null
  categoryIn?: number[]
  categoryNotIn?: number[]
  authorId?: number
  userId?: number
  order?: string
  key: string
}
