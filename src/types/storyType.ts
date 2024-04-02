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
  type?: number
  isFull: boolean | null
  categoryIn: string
  categoryNotIn: string
  authorId?: number
  userId?: number
  order?: string
  key: string
}

export interface StoryCreate {
  name: string
  descriptions: string
  avatar: string
  type: number
  AuthorId: number
  categories: number[]
}

export interface StoryHandleResponse {
  id: number
  name: string
  descriptions: string
  avatar: string
  type: number
  AuthorId: number
  categories: number[]
}
