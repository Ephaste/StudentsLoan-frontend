import React from 'react'
import Header from './admin-users/Header'
import Home from './admin-users/Home'
import Sidebar from './admin-users/Sidebar'
import styles from './admin-users/Admin.css'
import { useEffect } from 'react'
import HomeMember from './admin-users/HomeMember'



const Dashboard= () => {
  return (
    <div className='grid-container'>
      {/* <Header /> */}
      <Sidebar />
      <Home />
    </div>
  )
}

export default Dashboard

