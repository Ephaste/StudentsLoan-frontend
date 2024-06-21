import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import styles from "./LoansPage.css";

const SeeClientLoans = () => {
  const [loansData, setLoansData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClientLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:200/api/loans/getmemberloans", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setLoansData(response.data);
      } catch (error) {
        console.error("Error fetching client loans data:", error);
      }
    };

    fetchClientLoans();
  }, []);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = loansData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(loansData.length / recordsPerPage);
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

  const handleRowClick = (loan) => {
    navigate("/loanpaying", { state: { loan } });
  };

  if (loansData.length === 0) {
    return <p>No loans data available.</p>;
  }

  return (
    <div className="transactions-container">
      <section className="center">
        <h2>MY LOANS</h2>
        <table className="center">
          <thead>
            <tr>
              <th style={{ color: "#000" }}>Number</th>
              <th style={{ color: "#000" }}>Names</th>
              <th style={{ color: "#000" }}>National ID</th>
              <th style={{ color: "#000" }}>Loan</th>
              <th style={{ color: "#000" }}>Duration</th>
              <th style={{ color: "#000" }}>Payment Way</th>
              <th style={{ color: "#000" }}>Amount</th>
              <th style={{ color: "#000" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((item, indexNo) => (
              <tr key={item._id} onClick={() => handleRowClick(item)}>
                <td>{firstIndex + indexNo + 1}</td>
                <td>
                  <Link 
                    to={{
                      pathname: "/loanpaying",
                      state: { loan: item }
                    }} 
                    style={{ textDecoration: 'none', color: 'inherit' }} 
                    className="loans"
                  >
                    {item.name}
                  </Link>
                </td>
                <td>{item.nId}</td>
                <td>{item.loan} Frw</td>
                <td>{item.months} months</td>
                <td>{item.paymentWay}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
          </ul>
        </nav>
      </section>
    </div>
  );
};

export default SeeClientLoans;
