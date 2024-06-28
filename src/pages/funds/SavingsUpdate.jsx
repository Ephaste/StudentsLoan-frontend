import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "../auth/auth.module.scss";
import Card from '../../components/card/Card';
import axios from 'axios';

const UpdateSaving = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const saving = location.state?.saving;

  useEffect(() => {
    if (!saving) {
      navigate('/savingspage');
    }
  }, [saving, navigate]);

  const [formData, setFormData] = useState({
    name: saving?.name || '',
    nId: saving?.nId || '',
    phone: saving?.phone || '',
    shares: saving?.shares || 1,
    amount: saving?.amount || 2000,
    received: saving?.received || 'no',
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
      await axios.put(
        `http://localhost:200/api/funds/updatesaving/${saving._id}`,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert("Savings updated successfully");
      navigate("/savingspage");
    } catch (error) {
      console.error("Error updating savings:", error.response);
    }
  };

  if (!saving) {
    return null; // or render a fallback UI
  }

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>UPDATE SAVINGS</h2>
          <form method="POST" onSubmit={handleSubmit}>
            <input 
              type="text" 
              name="name" 
              placeholder="Names" 
              required 
              readOnly
              value={formData.name} 
              onChange={handleChange} 
            />
            <input 
              type="number" 
              name="nId" 
              placeholder="Enter your ID number" 
              readOnly              
              value={formData.nId} 
              onChange={handleChange} 
            />
            <input 
              type="number" 
              name="phone" 
              placeholder="Enter your phone number" 
              readOnly
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
                readOnly
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
            <div>
              <p>Received:</p>
              <select 
                id="received" 
                name="received" 
                value={formData.received} 
                onChange={handleChange} 
                required
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <button className="--btn --btn-primary --btn-block" type="submit">Update Savings</button>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default UpdateSaving;
