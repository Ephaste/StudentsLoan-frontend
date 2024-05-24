import React, { useState } from 'react';
import styles from "../auth/auth.module.scss";
import Card from '../../components/card/Card';

const Contribute = () => {
  const [shares, setShares] = useState(1);
  const [amount, setAmount] = useState(2000);

  const handleSharesChange = (e) => {
    const selectedShares = parseInt(e.target.value);
    setShares(selectedShares);
    setAmount(selectedShares * 2000);
  };

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>DONATE YOUR MONTHLY SHARES</h2>
          <form>
            <input type="text" placeholder="Names" required />
            <input type="number" placeholder="Enter your ID number" required />
            <input type="number" placeholder="Enter your phone number" required />
            <div>
              <p>Number of shares:</p>
              <select id="shares" value={shares} onChange={handleSharesChange} required>
                <option value="1">1 (2000 Rwf)</option>
                <option value="2">2 (4000 Rwf)</option>
                <option value="3">3 (6000 Rwf)</option>
                <option value="4">4 (8000 Rwf)</option>
                <option value="5">5 (10 000 Rwf)</option>
              </select>
            </div>
            <input type="number" placeholder="Amount" value={amount} readOnly />
            <button className="--btn --btn-primary --btn-block">Donate</button>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Contribute;
