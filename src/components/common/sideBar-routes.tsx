import {
  Layout,
  List,
  Palette,
  ShoppingBag,
  Store,
  User,
  XSquare,
} from 'lucide-react'
import RouteItem from './route-item'

const SideBarRoutes = () => {
  const sideBarRoutes = [
    {
      icon: Layout,
      label: 'Dashboard',
      href: '/',
    },
    {
      icon: User,
      label: 'Users',
      href: '/users',
    },
    {
      icon: Store,
      label: 'Products',
      href: '/products',
    },
    {
      icon: ShoppingBag,
      label: 'Orders',
      href: '/orders',
    },
    {
      icon: List,
      label: 'Categories',
      href: '/categories',
    },
    {
      icon: Palette,
      label: 'Colors',
      href: '/colors',
    },
    {
      icon: XSquare,
      label: 'Sizes',
      href: '/sizes',
    },
  ]

  return (
    <div className='flex flex-col gap-1 h-full'>
      {sideBarRoutes.map((route) => (
        <RouteItem
          key={route.label}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}

export default SideBarRoutes
