import styles from "./auth.module.scss";
import registerImg from "../../assets/sign-up.jpeg";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    regno: '',
    phone: '',
    photo: null,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !["image/jpeg", "image/png"].includes(file.type)) {
      setErrorMessage("Invalid image format. Please upload a JPEG or PNG file.");
      return;
    }
    setFormData({ ...formData, photo: file });
    setErrorMessage(""); // Clear error message if the file is valid
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (/^\d+$/.test(formData.name)) {
      setErrorMessage("Name must not be numbers only");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long");
      return;
    }
    if (!/^\+?[0-9]+$/.test(formData.phone)) {
      setErrorMessage("Phone number must be digits only, with an optional leading '+'");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (!formData.photo) {
      setErrorMessage("Please upload a photo");
      return;
    }

    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      await axios.post("http://localhost:200/api/users/register", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Account created successfully");
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.error || "Registration failed. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Register</h2>
          {errorMessage && <p className="error-message" style={{color: "red"}}>{errorMessage}</p>}
          <form method="POST" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your Email"
              required
            />
            <input
              type="text"
              name="regno"
              value={formData.regno}
              onChange={handleChange}
              placeholder="Enter Your Reg number"
            />
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            <p>Upload your picture</p>
            <input
              type="file"
              name="photo"
              onChange={handleFileChange}
              placeholder="Upload your picture"
              required
            />
            <button type="submit" className="--btn --btn-primary --btn-block">
              Register
            </button>
          </form>
          <span className={styles.register}>
            <p>Already have an account?</p>
            <Link to="/login">Login</Link>
          </span>
        </div>
      </Card>
      <div className={styles.img}>
        <img src={registerImg} alt="Register" width="400" />
      </div>
    </section>
  );
};

export default Register;
