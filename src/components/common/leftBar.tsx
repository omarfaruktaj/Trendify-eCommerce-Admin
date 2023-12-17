import SideBarRoutes from './sideBar-routes'

const LeftBar = () => {
  return (
    <div className=' h-full bg-background text-foreground border-r'>
      <div className='p-4 text-2xl font-bold'>
        <img
          className='h-10 '
          src='/public/trendify-logo.png'
          alt='Trendify logo'
        />
      </div>
      <div>
        <SideBarRoutes />
      </div>
    </div>
  )
}

export default LeftBar
