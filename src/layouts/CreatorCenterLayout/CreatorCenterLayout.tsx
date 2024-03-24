import { Outlet } from 'react-router-dom'
import Aside from './components/Aside/Aside'
import Header from './components/Header'

const CreatorCenterLayout = () => {
  return (
    <div className="">
      <Header />
      <main className="flex justify-between">
        <Aside />
        <section className="flex-1 bg-secondary p-6 px-10">
          <div className="bg-background w-full h-full p-4 rounded">
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  )
}

export default CreatorCenterLayout
