import { Outlet } from 'react-router-dom'
import Header from './components/Header'

const RootLayout = () => {
  return (
    <div className="container">
      <Header />
      <main className="mt-20 relative">
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout
