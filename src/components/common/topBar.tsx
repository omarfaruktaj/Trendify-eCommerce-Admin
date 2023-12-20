import { useAppSelector } from '@/store/hooks'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar'
import { Bell, StepBack, UserCircle } from 'lucide-react'
import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button'
import MobileSideBar from './mobileSideBar'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

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

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar>
              <AvatarImage src={user?.avatar?.url} />
              <AvatarFallback>
                <UserCircle size='25' />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {}}>
              <StepBack size='40' />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

export default TopBar
