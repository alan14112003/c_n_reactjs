import { Outlet } from 'react-router-dom'
import Aside from './components/Aside/Aside'
import Header from './components/Header'

const CreatorCenterLayout = () => {
  return (
    <div className="">
      <Header />
      <main className="flex justify-between">
        <Aside />
        <Outlet />
      </main>
    </div>
  )
}

export default CreatorCenterLayout
