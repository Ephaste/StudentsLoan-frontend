import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from "../auth/auth.module.scss";
import Card from '../../components/card/Card';

const LoanPay = () => {
  const location = useLocation();
  const loan = location.state?.loan || {};

  const [name, setName] = useState(loan.name || '');
  const [amount, setAmount] = useState(loan.paymentAmount || '');
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !amount || !document) {
      setError('All fields are required.');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('amount', amount);
    formData.append('document', document);

    try {
      const response = await fetch('http://localhost:3000/api/payment/pay', {
        method: 'POST',
        body: formData,
      });

      const contentType = response.headers.get('content-type');
      if (!response.ok) {
        if (contentType && contentType.indexOf('application/json') !== -1) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Network response was not ok');
        } else {
          throw new Error('An error occurred, and the server did not return JSON');
        }
      }

      const data = await response.json();
      console.log('Success:', data);
      alert("Paid!");
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while submitting the form: ' + error.message);
    }
  };

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>PAY</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter the full names"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="number"
              name="amount"
              placeholder="Enter Amount to pay"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
            <p>Upload a bank slip</p>
            <input
              type="file"
              name="document"
              onChange={(e) => setDocument(e.target.files[0])}
              required
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" className="--btn --btn-primary --btn-block">
              Send
            </button>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default LoanPay;
