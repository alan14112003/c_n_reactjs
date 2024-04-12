import { Outlet, useNavigate } from 'react-router-dom'
import Aside from './components/Aside/Aside'
import Header from './components/Header'
import { ArrowLeft, ArrowLeftCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'

const CreatorCenterLayout = () => {
  const navigate = useNavigate()

  return (
    <div className="">
      <Header />
      <main className="flex justify-between">
        <Aside />
        <section className="flex-1 bg-secondary p-6 px-10">
          <div className="bg-background w-full h-full p-4 rounded">
            <Button
              variant={'link'}
              size={'icon'}
              onClick={() => {
                navigate(-1)
              }}
              className="-ms-3 -mt-3"
            >
              <ArrowLeftCircle className="rounded-full" size={30} />
            </Button>
            <Outlet />
          </div>
        </section>
      </main>
    </div>
  )
}

export default CreatorCenterLayout
