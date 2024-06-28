import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useReactToPrint } from "react-to-print";
import styles from "./LoansPage.css"; // Ensure you have the correct path to your CSS file

export const LoansPage = () => {
  const [loansData, setLoansData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 7;
  const navigate = useNavigate();
  const componentPDF = useRef();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:200/api/loans/getall", {
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

  const handleRowClick = (loan) => {
    if (loan) {
      navigate("/loansupdate", { state: { loan } });
    } else {
      console.error("Loan data is missing");
    }
  };

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Loans Table",
    onAfterPrint: () => alert("Table saved in PDF")
  });

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

  return (
    <div className="transactions-container">
      <section className="table__body" ref={componentPDF}>
        <h2>LOANS APPLIED BY MEMBERS</h2>
        <table className="center">
          <thead>
            <tr>
              <th style={{ color: "#000" }}>Number</th>
              <th style={{ color: "#000" }}>Names</th>
              <th style={{ color: "#000" }}>Reg number</th>
              <th style={{ color: "#000" }}>Loan</th>
              <th style={{ color: "#000" }}>Duration</th>
              <th style={{ color: "#000" }}>Payment Way</th>
              <th style={{ color: "#000" }}>Amount</th>
              <th style={{ color: "#000" }}>Status</th>
              <th style={{ color: "#000" }}>Total Paid</th>
              <th style={{ color: "#000" }}>Remaining Amount</th>
              <th style={{ color: "#000" }}>Created Date</th> {/* New Column */}
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((item, indexNo) => (
              <tr key={item._id} onClick={() => handleRowClick(item)}>
                <td>{firstIndex + indexNo + 1}</td>
                <td>
                  <Link 
                    to={{
                      pathname: "/loansupdate",
                      state: { loan: item }
                    }} 
                    style={{ textDecoration: 'none', color: 'inherit' }} 
                    className="loans"
                  >
                    {item.name}
                  </Link>
                </td>
                <td>{item.regno}</td>
                <td>{item.loan} Frw</td>
                <td>{item.months} months</td>
                <td>{item.paymentWay}</td>
                <td>{item.amount}</td>
                <td>{item.status}</td>
                <td>{item.totalPaid}</td>
                <td>{item.remainingAmount}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td> 
              </tr>
            ))}
          </tbody>
        </table>
      </section>
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
    </div>
  );
}

export default LoansPage;
