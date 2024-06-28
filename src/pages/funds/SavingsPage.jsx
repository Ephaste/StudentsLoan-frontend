import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from "../loans/LoansPage.css";
import { useReactToPrint } from "react-to-print";

const SavingsPage = () => {
  const [savingsData, setSavingsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const navigate = useNavigate();
  const componentPDF = useRef();

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

  const handleRowClick = (saving) => {
    navigate('/updatesaving', { state: { saving } });
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Savings Table",
    onAfterPrint: () => alert("Table saved in PDF")
  });

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = savingsData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(savingsData.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const prePage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (id) => {
    setCurrentPage(id);
  };

  const nextPage = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="transactions-container">
      <section className="table__body">
        <div ref={componentPDF}>
          <h2>MEMBERS SAVINGS</h2>
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
              {currentRecords.map((item, index) => (
                <tr key={item._id} onClick={() => handleRowClick(item)}>
                  <td>{firstIndex + index + 1}</td>
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
        </div>
        <nav>
          <ul className="pagination">
            <li className="page-item">
              <a href="#" className="page-link" onClick={prePage}>Prev</a>
            </li>
            {numbers.map((n) => (
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={n}>
                <a href="#" className="page-link" onClick={() => changeCPage(n)}>{n}</a>
              </li>
            ))}
            <li className="page-item">
              <a href="#" className="page-link" onClick={nextPage}>Next</a>
            </li>
            <li>
            <button type="submit" className="--btn --btn-primary --btn-block" onClick={generatePDF}>
            PDF
          </button>
            </li>
          </ul>
       
        </nav>
      </section>
    </div>
  );
};

export default SavingsPage;
