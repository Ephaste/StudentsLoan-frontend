import React, { useEffect, useState } from "react";
import axios from 'axios';

export const LoansPaid = () => {
  const [loansData, setLoansData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        
        const response = await axios.get("http://localhost:200/api/payment/getall", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        setLoansData(response.data);
      } catch (error) {
        console.error("Error fetching loans data:", error);
      }
    };

    fetchLoans();
  }, []);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = loansData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(loansData.length / recordsPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const prePage = (e) => {
    e.preventDefault();
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeCPage = (e, id) => {
    e.preventDefault();
    setCurrentPage(id);
  };

  const nextPage = (e) => {
    e.preventDefault();
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="transactions-container">
      <section className="table__body">
        <h2>LOANS PAID BY MEMBERS</h2>
        <table className="center">
          <thead>
            <tr>
              <th style={{ color: "#000" }}>Number</th>
              <th style={{ color: "#000" }}>Names</th>
              <th style={{ color: "#000" }}>Amount</th>
              <th style={{ color: "#000" }}>Bankslip</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((item, indexNo) => (
              <tr key={item._id}>
                <td>{firstIndex + indexNo + 1}</td>
                <td>{item.name}</td>
                <td>{item.amount} Frw</td>
                <td>
                  {item.document ? (
                    <a href={`http://localhost:200${item.document}`} target="_blank" rel="noopener noreferrer">
                      View Slip
                    </a>
                  ) : (
                    "No slip"
                  )}
                </td>
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
                <a href="#" className="page-link" onClick={(e) => changeCPage(e, n)}>{n}</a>
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
}

export default LoansPaid;
