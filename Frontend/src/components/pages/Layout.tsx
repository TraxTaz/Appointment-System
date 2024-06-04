import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import TopBar from '../TopBar'

interface LayoutProps {
}

const Layout: FC<LayoutProps> = () => {
  return <>
    <TopBar />
    <Outlet />
  </>
}

export default Layout