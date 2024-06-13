import React, { useState } from 'react';
import styles from "../auth/auth.module.scss";
import Card from '../../components/card/Card';
import axios from 'axios';

const Contribute = () => {
  const [formData, setFormData] = useState({
    name: '',  
    nId: '', 
    phone:'', 
    shares: 1, 
    amount: 2000,
  });

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
      alert("Contribution successful");
      window.location.href = "/dashboardmember";
    } catch (error) {
      // notifyManager.failure(error);
      console.log(error.response);
    }
  };

  console.log("Form data we are seeing ------------------->", formData);

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>DONATE YOUR MONTHLY SHARES</h2>
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
              name="nId" 
              placeholder="Enter your ID number" 
              required 
              value={formData.nId} 
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
