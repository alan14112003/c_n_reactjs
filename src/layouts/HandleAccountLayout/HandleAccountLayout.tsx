import { Outlet } from 'react-router-dom'

const HandleAccountLayout = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Outlet />
    </div>
  )
}

export default HandleAccountLayout
