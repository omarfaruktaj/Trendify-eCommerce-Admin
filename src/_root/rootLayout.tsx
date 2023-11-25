import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (
    <>
      <p>Top bar.</p>
      <p>Left bar</p>
      <Outlet />
    </>
  )
}

export default RootLayout
