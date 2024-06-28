import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import Card from '../../components/card/Card';

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:200/api/users/login",
        formData
      );

      console.log('Server response:', res);

      if (res.data && res.data.token) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userdata", JSON.stringify(res.data));

        console.log('Data:', res.data);
        console.log('Role:', res.data.role);
        console.log('Approved:', res.data.approved);

        if (res.data.role === "admin") {
          navigate("/dashboardadmin");
        } else if (res.data.role === "member") {
          if (res.data.approved === "yes") {
            navigate("/dashboardmember");
          } else {
            alert("Wait for the admin to approve your account.");
          }
        } else {
          alert("Login failed: Invalid response from server");
        }
      } else {
        alert("Login failed: Invalid response from server");
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.response && error.response.data) {
        alert(error.response.data.message);
      } else {
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <section className={`container ${styles.auth}`}>
      <div className={styles.img}>
        <img src={loginImg} alt="Login" width="400" />
      </div>
      <Card>
        <div className={styles.form}>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Login
            </button>
            <div className={styles.links}>
              <Link to="/reset">Reset password</Link>
            </div>
            <p>-- or --</p>
          </form>
          <button className="--btn --btn-danger --btn-block">
            <FaGoogle color="#fff" /> Login with Google
          </button>
          <span className={styles.register}>
            <p>Don't have an account?</p> <Link to="/register">Register</Link>
          </span>
        </div>
      </Card>
    </section>
  );
};

export default Login;
