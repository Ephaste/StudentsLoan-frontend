import resetImg from "../../assets/forgot.jpeg";
import { Link } from 'react-router-dom';
import styles from "./auth.module.scss";
import Card from '../../components/card/Card';

const Reset = () => {
  return (
    <section className={`container ${styles.auth}`}>
    <div className={styles.img}>
      <img src={resetImg} alt="Reset password" width="400" />
    </div>
    <Card>
      <div className={styles.form}>
        <h2>Reset password</h2>
        <form>
          <input type="text" placeholder="Email" required />
          <button className="--btn --btn-primary --btn-block">Reset password</button>

          <div className={styles.links}>
            <p>  <Link to="/login">- Login</Link></p>
            <p>  <Link to="/register">- Register</Link></p>
          </div>
        
        </form>
      </div>
    </Card>
  </section>
  )
}

export default Reset
