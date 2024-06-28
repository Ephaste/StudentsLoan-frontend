import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "../auth/auth.module.scss";
import Card from "../../components/card/Card";
import axios from "axios";

const UserUpdate = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const member = location.state?.member;

  useEffect(() => {
    if (!member) {
      navigate('/seeallmembers');
    }
  }, [member, navigate]);

  const [formData, setFormData] = useState({
    name: member?.name || '',
    email: member?.email || '',
    nId: member?.regno || '',
    phone: member?.phone || '',
    approved: member?.approved || '',
  });

  const handleApprovedChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, approved: value });
  }

  const updateUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const dataToSend = {approved: formData.approved}

    try {
       await axios.put(
        `http://localhost:200/api/users/updateuser/${member._id}`,
        dataToSend,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      //console.log('Update Response:', response.data);
      alert("User updated successfully");
      navigate("/seeallmembers");
    } catch (error) {
      console.error("Error updating user:", error.response);
      alert("An error occurred during the update");
    }
  };

  if (!member) {
    return null; // or render a fallback UI
  }

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>UPDATE USER</h2>
          <form onSubmit={updateUser}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              readOnly
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formData.email}
              readOnly
            />
            <input
              type="text"
              name="regno"
              placeholder="Reg number"
              value={formData.nId}
              readOnly
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              readOnly
            />
            <div>
              <p>Approved:</p>
              <select
                id="approved"
                name="approved"
                value={formData.approved}
                onChange={handleApprovedChange}
                required
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
            <button type="submit" className="--btn --btn-primary --btn-block">
              Update User
            </button>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default UserUpdate;
