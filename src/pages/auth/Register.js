import styles from "./auth.module.scss";
import registerImg from "../../assets/sign-up.jpeg"
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import { useState } from "react";
import { type } from "@testing-library/user-event/dist/type";



const Register = () => {
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [nId, setnId] = useState("");
const [phone, setPhone] = useState("");
const [photo, setPhoto] = useState("");

const  signUp = async ()=>{
  let item = {name, password, email,nId,phone}
  console.log(item);

  let result = await fetch("https://studentsloan-backend-7.onrender.com//api/users/register", {
    method: "POST",
    body: JSON.stringify(item),
    headers:{
      "Content-Type":"application/json",
      "|Accept": "application/json"
    }
  })
  result = await result.json();
  console.log("result", result);
}

  return (

    <section className={`container ${styles.auth}`}>
   
    <Card>
      <div className={styles.form}>
        <h2>Register</h2>
        <form>
          <input type="text" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Enter your name" required />
          <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)}placeholder="Enter your Email" required />
          <input type="text" value={nId}  onChange={(e)=>setnId(e.target.value)} placeholder="Enter Your id" required />
          <input type="text" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="Enter your phone  number" required />
          <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)}placeholder="Password" required />
          <p>Upload your picture</p>
          <input type="file" value={photo} onChange={(e)=>setPhoto(e.target.value)} placeholder="Upload your picture" />
          <button onClick={signUp} className="--btn --btn-primary --btn-block">Register</button>
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
