import React from 'react'
import Header from './admin-users/DashHeader.jsx'
import DashMember from './admin-users/DashMember'
import SidebarMember from './admin-users/SidebarMember.jsx'
import styles from './admin-users/Admin.css'
import { useEffect } from 'react'
//import HomeMember from './admin-users/HomeMember'



const DashboardMember = () => {
  return (
    <div className='grid-container'>
      {/* <Header /> */}
      {/* <SidebarMember /> */}
      <DashMember />
    </div>
  )
}

export default DashboardMember

