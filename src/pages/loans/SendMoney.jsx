import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../auth/auth.module.scss";
import Card from '../../components/card/Card';
import axios from 'axios';

const SendMoney = () => {
  const [formData, setFormData] = useState({
    phone: '',
    amount: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setError("User not authenticated.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:200/api/paypack/cashin",
        {
          number: formData.phone,
          amount: formData.amount,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        alert("kurikiza amabwiriza kuri mobile yawe!");
        navigate("/dashboardmember");
      } else {
        setError("An error occurred while sending money. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending money:", error);
      setError("An error occurred while sending money. Please try again later.");
    }
  };

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>SEND MONEY</h2>
          {error && <div className="alert alert-danger" style={{ color: 'red' }}>{error}</div>}
          <form method="POST" onSubmit={handleSubmit}>
            <input
              type="number"
              name="phone"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount to pay"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Send
            </button>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default SendMoney;
