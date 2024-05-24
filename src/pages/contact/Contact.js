import React from 'react';
import styles from "../auth/auth.module.scss";
import Card from '../../components/card/Card';

const Contact = () => {
  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Contact Us</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email Adress" required />
            <textarea id="text" name="text" rows="4" cols="50"  placeholder="Drop Your message here" required/>
            <p>Attach document</p>
            <input type="file" />
            <button className="--btn --btn-primary --btn-block">Send</button>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Contact;
