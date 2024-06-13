import React, { useEffect, useState } from "react";
import styles from "../loans/LoansPage.css";
import axios from "axios";

export const SeeAllMembers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [membersData, setMembersData] = useState([]);
  const recordsPerPage = 7;

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

  return (
    <>
      <div className="transactions-container">
        <section className="table__body">
          <h2>LIST OF ALL MEMBERS</h2>
          <table className="center">
            <thead>
              <tr>
                <th style={{ color: "#000" }}>Number</th>
                <th style={{ color: "#000" }}>Names</th>
                <th style={{ color: "#000" }}>Email</th>
                <th style={{ color: "#000" }}>National ID</th>
                <th style={{ color: "#000" }}>Phone number</th>
                <th style={{ color: "#000" }}>Passport</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((item, indexNo) => (
                <tr key={item._id}>
                  <td>{firstIndex + indexNo + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.nId}</td>
                  <td>{item.phoneNumber}</td>
                  <td>{item.photo}</td>
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
    </>
  );
};

export default SeeAllMembers;
