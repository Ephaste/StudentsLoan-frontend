import styles from "./auth.module.scss";
import registerImg from "../../assets/sign-up.jpeg"
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";



const Register = () => {

const [formData, setFormData] = useState({
  name: '',  
  email: '', 
  password:'', 
  nId: '', 
  phone: '',
  photo: '',
});

const handleChange = (e) => {
  const { name, value } = e.target;
  let updatedFormData = { ...formData };
  updatedFormData[name] = value;
  //updatedFormData.role = activeForm === "Youtuber" ? "Youtuber" : "Viewer";
  setFormData(updatedFormData);
};

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    await axios.post(
      "http://localhost:200/api/users/register",
   
      formData
    );
    alert("account created sucessfully");
    window.location.href = "login";
   
  } catch (error) {
   // notifyManager.failure(error);
    console.log(error.response);
    

  }
  

};
console.log("Form data we are seeing ------------------->", formData);
  return (

    <section className={`container ${styles.auth}`}>
   
    <Card>
      <div className={styles.form}>
        <h2>Register</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name}
            onChange={handleChange} placeholder="Enter your name" required />
          <input type="text" name="email" value={formData.email}
            onChange={handleChange} placeholder="Enter your Email" required />
          <input type="text" name="nId" value={formData.nId}
            onChange={handleChange}placeholder="Enter Your id"  />
          <input type="text" name="phone" value={formData.phone}
            onChange={handleChange} placeholder="Enter your phone  number" />
          <input type="password" name="password" value={formData.password}
            onChange={handleChange} placeholder="Password" required/>
          <p>Upload your picture</p>
          <input type="file" name="photo" value={formData.photo}
            onChange={handleChange}placeholder="Upload your picture" />
          <button type="submit" className="--btn --btn-primary --btn-block">Register</button>
        </form>
        <span className={styles.register}>
          <p>Already have an account?</p> <Link to="/login">Login</Link>
        </span>
      </div>
    </Card>
    <div className={styles.img}>
      <img src={registerImg} alt="Login" width="400" />
    </div>
  </section>
  )
}

export default Register
