import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "../auth/auth.module.scss";
import Card from '../../components/card/Card';
import axios from 'axios';

const LoansUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loan = location.state?.loan;

  const [formData, setFormData] = useState({
    fullName: '',
    nId: '',
    loan: '',
    months: '',
    paymentMethod: '',
    status: '',
    amount: '',
    remainingAmount: '',
    totalPaid: '',
  });

  useEffect(() => {
    if (!loan) {
      navigate('/loanspage');
    } else {
      // Fetch the latest loan data to ensure we have up-to-date information
      const fetchLoanData = async () => {
        try {
          const token = localStorage.getItem('token');
          const response = await axios.get(`http://localhost:200/api/loans/${loan._id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const updatedLoan = response.data;
          setFormData({
            fullName: updatedLoan.name,
            nId: updatedLoan.nId,
            loan: updatedLoan.loan,
            months: updatedLoan.months,
            paymentMethod: updatedLoan.paymentWay,
            status: updatedLoan.status,
            amount: updatedLoan.amount,
            remainingAmount: updatedLoan.remainingAmount,
            totalPaid: updatedLoan.totalPaid,
          });
        } catch (error) {
          console.error("Error fetching loan data:", error);
        }
      };
      fetchLoanData();
    }
  }, [loan, navigate]);

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
        `http://localhost:200/api/loans/update/${loan._id}`,
        dataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      alert("Loan status updated successfully");
      navigate("/loanspage");
    } catch (error) {
      console.error("Error updating loan status:", error.response);
    }
  };

  if (!loan) {
    return null;
  }

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>UPDATE LOAN STATUS</h2>
          <form onSubmit={updateLoan}>
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
                <option value="paid">Paid</option>
                <option value="inst1-paid">Install1 Paid</option>
                <option value="inst2-paid">Install2 Paid</option>
                <option value="inst3-paid">Install3 Paid</option>
                <option value="inst4-paid">Install4 Paid</option>
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
