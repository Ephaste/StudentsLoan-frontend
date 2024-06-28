import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GettingContacts = () => {
  const [contactsData, setContactsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const recordsPerPage = 7;

  useEffect(() => {
    const fetchContactsData = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:200/api/contact/getall', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setContactsData(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching contacts data');
        setLoading(false);
      }
    };

    fetchContactsData();
  }, []);

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const currentRecords = contactsData.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(contactsData.length / recordsPerPage);
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
    <div className="contacts-container">
      <section className="table__body">
        <h2>Contact Messages</h2>
        <table className="center">
          <thead>
            <tr>
              <th style={{ color: "#000" }}>Number</th>
              <th style={{ color: "#000" }}>Name</th>
              <th style={{ color: "#000" }}>Email</th>
              <th style={{ color: "#000" }}>Message</th>
              <th style={{ color: "#000" }}>Document</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((item, index) => (
              <tr key={item._id}>
                <td>{firstIndex + index + 1}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.message}</td>
                <td>
                  {item.document ? (
                    <a href={`http://localhost:200${item.document}`} target="_blank" rel="noopener noreferrer">View Document</a>
                  ) : (
                    'No Document'
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

export default GettingContacts;
