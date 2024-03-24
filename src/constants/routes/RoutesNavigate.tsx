import { Home, LayoutList, MessageCircleMore, ScrollText } from 'lucide-react'

export const CREATOR_ROUTES_NAVIGATE = [
  {
    icon: <Home />,
    name: 'Trang chủ',
    link: '/creator-center',
    isIndex: true,
  },
  {
    icon: <LayoutList />,
    name: 'Truyện',
    link: '/creator-center/stories',
  },
  {
    icon: <ScrollText />,
    name: 'Chương',
    link: '/creator-center/chapters',
  },
  {
    icon: <MessageCircleMore />,
    name: 'Bình luận',
    link: '/creator-center/comments',
  },
]
