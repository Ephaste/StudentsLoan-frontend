import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from "./Header.module.scss";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoNotifications } from "react-icons/io5";
import { FaTimes } from 'react-icons/fa';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';

const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        <div className={styles.trial}>Student<span>Loan</span></div>
      </h2>
    </Link>
  </div>
);

const months = (
  <span className={styles.months}>
    <Link to="/notifications">
      <IoNotifications size={20} />
    </Link>
  </span>
);

const activeLink = ({ isActive }) => (isActive ? `${styles.active}` : "");

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError("User not authenticated.");
        return;
      }
      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.id;

        const response = await axios.get(`http://localhost:200/api/users/getuserbyid/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        setRole(response.data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
        setError("Error fetching user role. Please try again.");
      }
    };

    fetchUserRole();
  }, []);

  const handleAccountClick = () => {
    console.log('Role:', role); // Ensure role state is correctly updated
    if (role === 'admin') {
      console.log('Navigating to /dashboardadmin');
      navigate('/dashboardadmin');
    } else if (role === 'member') {
      console.log('Navigating to /dashboardmember');
      navigate('/dashboardmember');
    } else {
      alert('Invalid user role');
    }
  };
  

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  return (
    <header>
      <div className={styles.header}>
        {logo}

        <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`}>
          <div
            className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`}
            onClick={hideMenu}
          ></div>

          <ul onClick={hideMenu}>
            <li className={styles["logo-mobile"]}>
              {logo}
              <FaTimes size={22} color="fff" onClick={hideMenu} />
            </li>
            <li>
              <NavLink to="/" className={activeLink}>Home</NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={activeLink}>Contact us</NavLink>
            </li>
            <li>
              <NavLink to="/contribute" className={activeLink}>Contribute</NavLink>
            </li>
            <li>
              <NavLink to="/applyloan" className={activeLink}>Apply for loan</NavLink>
            </li>
          </ul>

          <div className={styles["header-right"]} onClick={hideMenu}>
            <span className={styles.links}>
              <NavLink to="/login" className={activeLink}>Login</NavLink>
              <NavLink to="/register" className={activeLink}>Register</NavLink>
              <NavLink to="/login" className={activeLink}>My Account</NavLink>
            </span>
            {months}
          </div>
        </nav>

        <div className={styles["menu-icon"]}>
          {months}
          <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
        </div>
      </div>
    </header>
  );
};

export default Header;
