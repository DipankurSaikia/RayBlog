import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state

  // Toggle function for the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <>
    <Header onToggleSidebar={toggleSidebar}/>
    <div className="hero-wrapper w-vw h-[95vh] pt-4 flex gap-2">
      <Sidebar close = {isSidebarOpen} />
      <div className="hero-right-content h-full w-full overflow-auto px-4">
       <Outlet/>
      </div>
    </div>
  </>
  )
}

export default Layout