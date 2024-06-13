import React from 'react'
import Header from './admin-users/Header.jsx'
import SidebarAdmin from './admin-users/SidebarAdmin.jsx'
import Dash from './admin-users/Dash.jsx'
import styles from './admin-users/Admin.css'
import { useEffect } from 'react'
//import HomeMember from './admin-users/HomeMember'



const DashboardAdmin = () => {
  return (
    <div className='grid-container'>
      {/* <Header /> */}
      {/* <SidebarAdmin /> */}
      <Dash />
    </div>
  )
}

export default DashboardAdmin

