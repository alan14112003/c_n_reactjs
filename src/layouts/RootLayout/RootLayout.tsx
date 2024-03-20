import { Outlet } from 'react-router-dom'
import Header from './components/Header'

const RootLayout = () => {
  return (
    <div className="container">
      <Header />
      <main className="mt-14">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
