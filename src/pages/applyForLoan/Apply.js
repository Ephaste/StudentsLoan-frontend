import React, { useState, useEffect } from 'react';
import styles from "../auth/auth.module.scss";
import Card from '../../components/card/Card';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Apply = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    regno: '',
    loan: '',
    months: '3',
    paymentMethod: '',
    status: 'pending',
  });
  const [amount, setAmount] = useState(0);
  const [savings, setSavings] = useState(0);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    console.log(`Updated form data: ${name} = ${value}`);
  };

  const calculateAmount = () => {
    const loan = parseFloat(formData.loan) || 0;
    const months = parseInt(formData.months) || 0;
    const calculatedAmount = loan + (loan * 0.02) * months;
    setAmount(calculatedAmount);
  };

  const fetchSavings = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        "http://localhost:200/api/funds/getfundsforuser",
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setSavings(response.data.amount);
      console.log(`Fetched savings: ${response.data.amount}`);
    } catch (error) {
      console.error("Error fetching savings:", error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id;

      try {
        const response = await axios.get(`http://localhost:200/api/users/getuserbyid/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setUser(response.data);
        setFormData((prevData) => ({
          ...prevData,
          fullName: response.data.name,
        }));
        console.log("Fetched user data:", response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
    fetchSavings();
  }, []);

  useEffect(() => {
    calculateAmount();
  }, [formData.loan, formData.months]);

  const apply = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const loanAmount = parseFloat(formData.loan);
    const requiredSavings = loanAmount * 0.60;

    if (savings < requiredSavings) {
      setError(`Insufficient savings. You need at least ${requiredSavings} in savings to apply for this loan.`);
      return;
    }

    if (user && user.regno !== formData.regno) {
      setError("Registration number does not match.");
      return;
    }

    const dataToSend = {
      name: formData.fullName,
      regno: formData.regno,
      loan: formData.loan,
      months: formData.months,
      paymentMethod: formData.paymentMethod,
      amount: amount.toString(),
      status: formData.status,
      remainingAmount: loanAmount,
    };

    console.log("Data to send:", JSON.stringify(dataToSend, null, 2));

    try {
      const response = await axios.post(
        "http://localhost:200/api/loans/apply",
        dataToSend,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert("Loan application successful");
      window.location.href = "/dashboardmember";
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setError(error.response.data.error);
      } else {
        setError("An error occurred while applying for the loan.");
      }
      console.error("Error applying for loan:", error.response ? error.response.data : error);
    }
  };

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>LOAN APPLICATION</h2>
          {error && <div className="alert alert-danger" style={{ color: 'red' }}>{error}</div>}
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
              name="regno"
              placeholder="Enter your Reg number"
              value={formData.regno}
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
                id="paymentMethod"
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
