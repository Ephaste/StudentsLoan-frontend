import React, { useState, useEffect } from "react";
import axios from 'axios';
import styles from "../loans/LoansPage.css";

const SavingsPage = () => {
  const [savingsData, setSavingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSavingsData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get("http://localhost:200/api/funds/getall", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setSavingsData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching savings data');
        setLoading(false);
      }
    };

    fetchSavingsData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="transactions-container">
      <section className="table__body">
        <h2>MEMBERS SAVINGS</h2>
        <table className="center">
          <thead>
            <tr>
              <th style={{ color: "#000" }}>Number</th>
              <th style={{ color: "#000" }}>Names</th>
              <th style={{ color: "#000" }}>National ID</th>
              <th style={{ color: "#000" }}>Phone number</th>
              <th style={{ color: "#000" }}>Shares</th>
              <th style={{ color: "#000" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {savingsData.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.nId}</td>
                <td>{item.phone}</td>
                <td>{item.shares}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default SavingsPage;