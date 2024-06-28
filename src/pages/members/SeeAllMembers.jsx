import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../loans/LoansPage.css";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

export const SeeAllMembers = () => {
  const componentPDF = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [membersData, setMembersData] = useState([]);
  const recordsPerPage = 7;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get("http://localhost:200/api/users/getusers", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setMembersData(response.data);
      } catch (error) {
        console.error("Error fetching members data:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleRowClick = (member) => {
    navigate('/updateuser', { state: { member } });
  };

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = membersData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(membersData.length / recordsPerPage);
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
  
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Members Table",
    onAfterPrint: () => alert("Table saved in PDF")
  });

  return (
    <>
      <div className="transactions-container">
        <section className="table__body">
          <div ref={componentPDF}>
            <h2>LIST OF ALL MEMBERS</h2>
            <table className="center">
              <thead>
                <tr>
                  <th style={{ color: "#000" }}>Number</th>
                  <th style={{ color: "#000" }}>Names</th>
                  <th style={{ color: "#000" }}>Email</th>
                  <th style={{ color: "#000" }}>Reg number</th>
                  <th style={{ color: "#000" }}>Phone number</th>
                  <th style={{ color: "#000" }}>Approved</th>
                  <th style={{ color: "#000" }}>Passport</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item, indexNo) => (
                  <tr key={item._id} onClick={() => handleRowClick(item)}>
                    <td>{firstIndex + indexNo + 1}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.regno}</td>
                    <td>{item.phone}</td>
                    <td>{item.approved}</td>
                    <td>
                      {item.photo ? (
                        <img src={`http://localhost:200${item.photo}`} alt="Passport" width="50" height="50" />
                      ) : (
                        "No Image"
                      )}
                    </td>
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
              <li className="page-item">
                <button type="submit" className="--btn --btn-primary --btn-block" onClick={generatePDF}>
                  PDF
                </button>
              </li>
            </ul>
          </nav>
        </section>
      </div>
    </>
  );
};

export default SeeAllMembers;
