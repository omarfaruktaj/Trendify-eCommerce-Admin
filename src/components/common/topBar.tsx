import { useAppSelector } from '@/store/hooks'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Bell, UserCircle } from 'lucide-react'
import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button'
import MobileSideBar from './mobileSideBar'

const TopBar = () => {
  const user = useAppSelector((state) => state.auth.user)

  return (
    <div className=' flex items-center justify-between p-2 h-full border border-l-0 bg-background'>
      <div>
        <MobileSideBar />
      </div>
      <div className='flex items-center justify-end space-x-2 md:space-x-3'>
        <ModeToggle />
        <Button
          variant='outline'
          size='icon'
          className='rounded-full'
        >
          <Bell size='25' />
        </Button>
        <Avatar>
          <AvatarImage src={user?.avatar?.url} />
          <AvatarFallback>
            <UserCircle size='25' />
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}

export default TopBar
