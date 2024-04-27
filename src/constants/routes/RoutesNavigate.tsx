import {
  Heart,
  Home,
  LayoutList,
  MessageCircleMore,
  ScrollText,
} from 'lucide-react'

export const CREATOR_ROUTES_NAVIGATE = [
  {
    icon: <Home />,
    name: 'creator_navigation.home',
    link: '/creator-center',
    isIndex: true,
  },
  {
    icon: <LayoutList />,
    name: 'creator_navigation.stories',
    link: '/creator-center/stories',
  },
  {
    icon: <ScrollText />,
    name: 'creator_navigation.chapters',
    link: '/creator-center/chapters',
  },
  {
    icon: <MessageCircleMore />,
    name: 'creator_navigation.comments',
    link: '/creator-center/comments',
  },
]

export const ROOT_ROUTES_NAVIGATE = [
  {
    icon: <Home />,
    name: 'root_navigation.home',
    link: '/',
    isIndex: true,
  },
  {
    icon: <Heart />,
    name: 'root_navigation.favorite',
    link: '/favorite',
  },
]
