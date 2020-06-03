import React from 'react'
import '../styles/navbar.scss'
import { FaGlobeAfrica, FaNewspaper } from 'react-icons/fa';
const Sidebar = ({active}) => {


    const SidebarItem = ({active, children}) => (
        <div className={`sidebar-item ${active && 'active'}`}>
            {children}
        </div>
    )

    return (
        <nav>
            <SidebarItem active>
                <FaGlobeAfrica       
                size={32}
                />
            </SidebarItem>
            <SidebarItem>
                <FaNewspaper       
                size={32}
                />
            </SidebarItem>
            <SidebarItem active>
                <FaGlobeAfrica       
                size={32}
                />
            </SidebarItem>
        </nav>
    )
}

export default Sidebar
