import React, { useState, useEffect } from 'react';
import styles from "../auth/auth.module.scss";
import Card from '../../components/card/Card';
import axios from 'axios';

const LoansUpdate = ({ loanId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    nId: '',
    loan: '',
    months: '',
    paymentMethod: '',
    status: '',
    amount: '',
  });

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:200/api/loans/${loanId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        setFormData(response.data);
      } catch (error) {
        console.error("Error fetching loan details:", error.response);
      }
    };
    fetchLoanDetails();
  }, [loanId]);

  const handleStatusChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, status: value });
  };

  const updateLoan = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const dataToSend = { status: formData.status };

    try {
      await axios.put(
        `http://localhost:200/api/loans/${loanId}`,
        dataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      // Handle success (e.g., show a success message or redirect)
      // alert("Loan status updated successfully");
      // window.location.href = "admin-dashboard";
    } catch (error) {
      // Handle error (e.g., show an error message)
      console.error("Error updating loan status:", error.response);
      // notifyManager.failure(error.response.data.message);
    }
  };

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>UPDATE LOAN STATUS</h2>
          <form onSubmit={updateLoan}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              readOnly
            />
            <input
              type="number"
              name="nId"
              placeholder="ID"
              value={formData.nId}
              readOnly
            />
            <input
              type="number"
              name="loan"
              placeholder="Requested Loan"
              value={formData.loan}
              readOnly
            />
            <div>
              <p>Payment Period:</p>
              <select
                id="months"
                name="months"
                value={formData.months}
                readOnly
              >
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="9">9 Months</option>
              </select>
            </div>
            <div>
              <p>Payment Method:</p>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                readOnly
              >
                <option value="">Installment</option>
                <option value="oneTime">At one time</option>
              </select>
            </div>
            <p>Amount to be Paid:</p>
            <input
              type="number"
              name="amount"
              placeholder="Amount"
              value={formData.amount}
              readOnly
            />
            <div>
              <p>Status:</p>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleStatusChange}
                required
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
            <button type="submit" className="--btn --btn-primary --btn-block">
              Update Status
            </button>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default LoansUpdate;
