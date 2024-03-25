import SearchBoxUI from '@/components/SearchBoxUI'
import { toast } from 'react-toastify'

const StoriesPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold">Quản lý truyện của bạn</h2>
      <div className="mt-4">
        <SearchBoxUI searchKey="" onChange={(value) => {}} />
        <div className="flex gap-4"></div>
      </div>
    </div>
  )
}

export default StoriesPage
