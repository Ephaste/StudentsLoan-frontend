import {React, useEffect, useState} from 'react'
import { BsCart3 , BsPeopleFill, BsFillGrid3X3GapFill} from 'react-icons/bs'
import { MdSavings } from "react-icons/md";

import { FcDebt, FcPaid} from "react-icons/fc";
const Sidebar = () => {
  return (
 <aside id='sidebar'>
    <div className='sidebar-title'>
        <div className='sidebar-brand'>
           
        </div>
<span className='icon close_icon'>X</span>
    </div>
    <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          < a href=''> <BsFillGrid3X3GapFill className='icon'/>Dashboard</a>
        </li>
        <li className='sidebar-list-item'>
          < a href=''> <BsPeopleFill className='icon'/>Members</a>
        </li>
        <li className='sidebar-list-item'>
          < a href=''> <MdSavings className='icon'/>Savigs</a>
        </li>
        <li className='sidebar-list-item'>
          < a href=''> <FcDebt className='icon'/>Loans</a>
        </li>
        <li className='sidebar-list-item'>
          < a href=''> <FcPaid className='icon'/>Loans paid</a> 
        </li>
    </ul>
 </aside>
  )
}

export default Sidebar

