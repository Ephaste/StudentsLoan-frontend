import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarAdmin from '../../pages/dashboard/admin-users/SidebarAdmin';
import DashHeader from '../../pages/dashboard/admin-users/DashHeader';
import Footer from '../footer/Footer';

const AdminLayout = () => {
  return (
    <div>
      <DashHeader />
      <div style={{ display: 'flex' }}>
        <SidebarAdmin />
          <Outlet />
        </div>
       
        <Footer />
     {/* </div> */}
    </div>
  );
}

export default AdminLayout;
