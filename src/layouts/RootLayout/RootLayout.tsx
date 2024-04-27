import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import SideBar from './components/SideBar'

const RootLayout = () => {
  return (
    <>
      <div className="container">
        <Header />
      </div>
      <div className="mt-20 flex gap-4">
        <SideBar />

        <div className="container">
          <main className="relative">
            <Outlet />
          </main>
        </div>
      </div>
    </>
  )
}

export default RootLayout
