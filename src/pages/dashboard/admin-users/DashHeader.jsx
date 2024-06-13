import {React, useEffect, useState} from 'react'
import { BsBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify, BsFillBellFill, BsPersonWalking } from 'react-icons/bs'
import styles from "./Admin.css";

const Header = () => {
  return (
  <header className='header'>
    <div className='menu-icons'>
        <BsJustify className='icon'/>

    </div>
    <div className='header-left'>
    <BsSearch className='icon'/>
    </div>
    <div className='header-right'>
    <BsFillBellFill className='icon'/>
    <BsFillEnvelopeFill className='icon'/>
   <BsPersonCircle className='icon'/>
    </div>
  </header>
  )
}

export default Header

