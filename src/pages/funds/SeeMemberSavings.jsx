import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "../loans/LoansPage.css";

const SeeMemberSavings = () => {
  const [memberSavings, setMemberSavings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMemberSavings = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get("http://localhost:200/api/funds/getfundsforuser", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMemberSavings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching member savings data');
        setLoading(false);
      }
    };

    fetchMemberSavings();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
 

  const hasUnreceivedSavings = memberSavings.some(saving => saving.received === "no");
  return (
    <div className="transactions-container">
      <section className="table__body">
        <h2>MY SAVINGS</h2>
        <table className="center">
          <thead>
            <tr>
              <th style={{ color: "#000" }}>Number</th>
              <th style={{ color: "#000" }}>Names</th>
              <th style={{ color: "#000" }}>Reg number</th>
              <th style={{ color: "#000" }}>Phone number</th>
              <th style={{ color: "#000" }}>Shares</th>
              <th style={{ color: "#000" }}>Amount</th>
              <th style={{ color: "#000" }}>Received</th>
            </tr>
          </thead>
          <tbody>
            {memberSavings.map((item, index) => (
              <tr key={item._id} className={item.received === "no" ? "highlight" : ""}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.regno}</td>
                <td>{item.phone}</td>
                <td>{item.shares}</td>
                <td>{item.amount}</td>
                <td>{item.received}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {hasUnreceivedSavings && <p style={{ color: 'red' }} className="savings" >You have unreceived savings. Please address them before adding new ones</p>}
      </section>
    </div>
  );
};

export default SeeMemberSavings;
