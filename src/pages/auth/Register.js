import styles from "./auth.module.scss";
import registerImg from "../../assets/sign-up.jpeg"
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";


const Register = () => {
  return (
    <section className={`container ${styles.auth}`}>
   
    <Card>
      <div className={styles.form}>
        <h2>Register</h2>
        <form>
          <input type="text" placeholder="Enter your name" required />
          <input type="text" placeholder="Enter your Email" required />
          <input type="text" placeholder="Enter Your id" required />
          <input type="text" placeholder="Enter your phone  number" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder=" Confirm  Password" required />
          <p>Upload your picture</p>
          <input type="file" placeholder="Upload your picture" required />
          <button className="--btn --btn-primary --btn-block">Register</button>
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
