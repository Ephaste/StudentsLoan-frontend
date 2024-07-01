import React, { useState, useEffect } from 'react';
import styles from "../auth/auth.module.scss";
import Card from '../../components/card/Card';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Contribute = () => {
  const [formData, setFormData] = useState({
    name: '',
    regno: '',
    phone: '',
    shares: 1,
    amount: 2000,
    received: 'no',
  });

  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
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

        setUser(response.data);
        setFormData((prevData) => ({
          ...prevData,
          name: response.data.name,
          phone: response.data.phone
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData };

    if (name === "shares") {
      const selectedShares = parseInt(value);
      updatedFormData[name] = selectedShares;
      updatedFormData.amount = selectedShares * 2000;
    } else {
      updatedFormData[name] = value;
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError("User not authenticated.");
      return;
    }
    if (user.regno !== formData.regno) {
      setError("Registration number does not match.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:200/api/funds/contribute",
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert("Contribution is recorded, Wait for an admin to approve! ");
      window.location.href = "/dashboardmember";
    } catch (error) {
      console.log(error.response);
      setError("An error occurred while processing your contribution. Please try again later.");
    }
  };

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>DONATE YOUR MONTHLY SHARES</h2>
          {error && <div className="alert alert-danger" style={{ color: 'red' }}>{error}</div>}
          <form method="POST" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Names"
              required
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="number"
              name="regno"
              placeholder="Enter your Reg number"
              required
              value={formData.regno}
              onChange={handleChange}
            />
            <input
              type="number"
              name="phone"
              placeholder="Enter your phone number"
              required
              value={formData.phone}
              onChange={handleChange}
            />
            <div>
              <p>Number of shares:</p>
              <select
                id="shares"
                name="shares"
                value={formData.shares}
                onChange={handleChange}
                required
              >
                <option value="1">1 (2000 Rwf)</option>
                <option value="2">2 (4000 Rwf)</option>
                <option value="3">3 (6000 Rwf)</option>
                <option value="4">4 (8000 Rwf)</option>
                <option value="5">5 (10 000 Rwf)</option>
              </select>
            </div>
            <input
              type="number"
              placeholder="Amount"
              value={formData.amount}
              readOnly
            />
            <button className="--btn --btn-primary --btn-block" type="submit">Contribute</button>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Contribute;
