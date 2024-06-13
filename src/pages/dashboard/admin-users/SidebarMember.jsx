import {React, useEffect, useState} from 'react'
import { BsCart3 , BsPeopleFill, BsFillGrid3X3GapFill} from 'react-icons/bs'
import { MdSavings } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { FcDebt, FcPaid} from "react-icons/fc";
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SidebarMember = () => {
  const  navigate = useNavigate();
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
        <PiStudentBold size={60}/>
        </div>
<span className='icon close_icon'>X</span>
    </div>
    <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
            <NavLink to="/dashboardmember">
      <BsFillGrid3X3GapFill className='icon'/>Dashboard
      </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to= "/savingsmemberpage">
          <MdSavings className='icon'/>My Savings
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to=  "/loansmemberpage" > 
           <FcDebt className='icon'/>My Loans
           </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to=  "/applyloan" > 
           <FcDebt className='icon'/>Apply loan
           </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to=  "/contribute" > 
           <FcDebt className='icon'/>Contribute
           </NavLink>
        </li>
        <li className='sidebar-list-item'>
        <NavLink to="" onClick={handleLogout}>
            <IoLogOutOutline className='icon' />Logout
          </NavLink>
        </li>
    </ul>
 </aside>
  )
}

export default SidebarMember

