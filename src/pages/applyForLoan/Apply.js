import React, { useState, useEffect } from 'react';
import styles from "../auth/auth.module.scss";
import Card from '../../components/card/Card';
import axios from 'axios';

const Apply = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nId: '',
    loan: '',
    months: '3',
    paymentMethod: '',
    status: 'pending',
    amount: '',
  });
  const [amount, setAmount] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateAmount = () => {
    const loan = parseFloat(formData.loan) || 0;
    const months = parseInt(formData.months) || 0;
    const calculatedAmount = loan + (loan * 0.02) * months;
    setAmount(calculatedAmount);
  };

  useEffect(() => {
    calculateAmount();
  }, [formData.loan, formData.months]);

  const apply = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const dataToSend = { 
      name: formData.fullName, 
      nId: formData.nId, 
      loan: formData.loan, 
      months: formData.months, 
      paymentWay: formData.paymentMethod, 
      amount: amount.toString(), 
      status: formData.status 
    };

    try {
      await axios.post(
        "http://localhost:200/api/loans/apply",
        dataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      // Handle success (e.g., show a success message or redirect)
      alert("Loan application successful");
       window.location.href = "/dashboardmember";
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error applying for loan:", error.response);
      // notifyManager.failure(error.response.data.message);
    }
  };

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>LOAN APPLICATION</h2>
          <form onSubmit={apply}>
            <input
              type="text"
              name="fullName"
              placeholder="Enter the full names"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="nId"
              placeholder="Enter your ID"
              value={formData.nId}
              onChange={handleChange}
              required
            />
            <input
              type="number"
              name="loan"
              placeholder="Requested amount"
              value={formData.loan}
              onChange={handleChange}
              required
            />
            <div>
              <p>I will pay in :</p>
              <select
                id="months"
                name="months"
                value={formData.months}
                onChange={handleChange}
                required
              >
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="9">9 Months</option>
              </select>
            </div>
            <div>
              <p>Choose payment method:</p>
              <select
                id="way"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                required
              >
                <option value="installment">Installment</option>
                <option value="oneTime">At one time</option>
              </select>
            </div>
            <p>You will pay:</p>
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              readOnly
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Apply
            </button>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Apply;
