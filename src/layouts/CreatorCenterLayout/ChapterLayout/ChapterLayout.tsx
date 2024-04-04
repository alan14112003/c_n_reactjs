import { Outlet } from 'react-router-dom'

const ChapterLayout = () => {
  return (
    <div className="flex justify-between">
      <div className="w-4/12">chapter layout</div>
      <div className="w-8/12">
        <Outlet />
      </div>
    </div>
  )
}

export default ChapterLayout
