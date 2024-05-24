import {useState} from 'react'
import { Link,NavLink } from 'react-router-dom'
import styles from "./Header.module.scss"
import { HiCheck, HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { FaTimes } from 'react-icons/fa';


  
const logo = ( 
   <div className={styles.logo}>
  <Link to= "/">
  <h2 >
 <div className={styles.trial}>Student<span>Loan</span></div>
  </h2>
  </Link>
  
        </div>);
 const months = (
          <span className= {styles.months}>
            <Link to= "/notifications">
              <IoNotifications size={20}/>
             
            </Link>
          </span>
        );
        const activeLink = ({isActive}) =>(isActive
          ? `${styles.active}` : "")


const Header = () => {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () =>{
setShowMenu(!showMenu);
  };
  const hideMenu =()=>{
    setShowMenu(false);
  }
  return (
  <header>
    <div className={styles.header}>
    {logo}

    <nav className={showMenu ? `${styles["show-nav"]}`
    : `${styles["hide-nav"]}` }>


      <div className = {showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` 
      :`${styles["nav-wrapper"]}`}
      onClick ={hideMenu}></div>

    <ul onClick={hideMenu}>
      <li className={styles["logo-mobile"]}>
        {logo}
        <FaTimes size= {22} color ="fff" onClick={hideMenu} />
      </li>
           
            <li> 
              <NavLink to="/" className={activeLink}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>Contact us </NavLink>
            </li>
            <li>
              <NavLink to="/contribute" className={activeLink}>Contribute</NavLink>
            </li>
            <li>
              <NavLink to="/applyloan" className={activeLink}>Apply for loan</NavLink>
           </li>
        
          </ul>
 
    <div className={styles["header-right"]} onClick={hideMenu
    }>
<span className = {styles.links}>
<NavLink to="/login" className={activeLink}>Login</NavLink>
<NavLink to="/register" className={activeLink}>Register</NavLink>
<NavLink to="/dashboard" className={activeLink}>My Account</NavLink>
</span>
{months}
    </div>
    </nav>

    <div className= {styles["menu-icon"]}>
      {months}
      <HiOutlineMenuAlt3 size ={28} onClick={toggleMenu}/>
    </div>
    </div>
   
    </header>
  )
}

export default Header
