import { Button } from '../ui/button'
import Logo from '../ui/logo'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet'
import SideBarRoutes from './sideBar-routes'

Sheet
const MobileSideBar = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='outline'
          size='icon'
          className='block md:hidden'
        >
          <div className='flex flex-col items-center justify-center gap-1'>
            <div className='h-1 w-7 rounded-full bg-black dark:bg-white'></div>
            <div className='h-1 w-7 rounded-full bg-black dark:bg-white'></div>
            <div className='h-1 w-7 rounded-full bg-black dark:bg-white'></div>
          </div>
        </Button>
      </SheetTrigger>
      <SheetContent side='left'>
        <SheetHeader>
          <SheetTitle>
            <div className='mb-4'>
              <Logo />
            </div>
          </SheetTitle>
        </SheetHeader>

        <SideBarRoutes />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSideBar
