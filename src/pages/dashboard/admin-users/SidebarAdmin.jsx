import React, { useEffect, useState } from 'react';
import { BsCart3 , BsPeopleFill, BsFillGrid3X3GapFill } from 'react-icons/bs';
import { IoLogOutOutline } from "react-icons/io5";
import { MdSavings } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { FcDebt, FcPaid } from "react-icons/fc";
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SidebarAdmin = () => {
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    axios.get("http://localhost:200/api/users/logout")
      .then(res => {
        if (res.status === 200) {
          localStorage.removeItem('token');
          navigate("/");
        } else {
          alert("Error logging out");
        }
      }).catch(err => {
        console.log(err);
        alert("Error logging out");
      });
  };

  return (
    <aside id='sidebar'>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <PiStudentBold size={60} />
        </div>
        <span className='icon close_icon'>X</span>
      </div>
      <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <NavLink to="/dashboardadmin">
            <BsFillGrid3X3GapFill className='icon' />Dashboard
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/seeallmembers"> 
            <BsPeopleFill className='icon' />Members
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/savingspage">
            <MdSavings className='icon' />Savings
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="/loanspage"> 
            <FcDebt className='icon' />Loans
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="loanspaid">
            <FcPaid className='icon' />Loans paid
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="" onClick={handleLogout}>
            <IoLogOutOutline className='icon' />Logout
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default SidebarAdmin;
