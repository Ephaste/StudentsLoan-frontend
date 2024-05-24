import React from 'react';
import styles from "../auth/auth.module.scss";
import Card from '../../components/card/Card';

const Contribute = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>LOAN APPLICATION</h2>
          <form>
            <input type="text" placeholder="Enter the full  names" required />
            <input type="Number" placeholder="Enter your id" required />
            <input type="Number" placeholder="Requested amount" required />
            <p>When do you plan to pay?</p>
            <input type="date" placeholder="Paymen date" required />
            <button className="--btn --btn-primary --btn-block">Apply</button>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Contribute;
