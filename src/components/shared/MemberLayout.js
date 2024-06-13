import React from 'react';
import { Outlet } from 'react-router-dom';
import SidebarMember from '../../pages/dashboard/admin-users/SidebarMember';
import DashHeader from '../../pages/dashboard/admin-users/DashHeader';
import Footer from '../footer/Footer';

const MemberLayout = () => {
  return (
    <div>
      <DashHeader />
      <div style={{ display: 'flex' }}>
        <SidebarMember />
          <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default MemberLayout;
