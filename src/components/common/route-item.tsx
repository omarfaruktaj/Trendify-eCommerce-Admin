import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

interface RouteItemProps {
  icon: LucideIcon
  label: string
  href: string
}

const RouteItem = ({ icon: Icon, label, href }: RouteItemProps) => {
  return (
    <div className='   '>
      <NavLink
        to={href}
        className={({ isActive }) =>
          cn(
            'flex items-center gap-x-2 p-3 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-white hover:text-black',
            isActive &&
              'bg-gray-100 text-black dark:bg-gray-800 dark:text-white'
          )
        }
      >
        <Icon size='22' />
        {label}
      </NavLink>
    </div>
  )
}

export default RouteItem
