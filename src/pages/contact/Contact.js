import React, { useState } from 'react';
import styles from '../auth/auth.module.scss';
import Card from '../../components/card/Card';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    document: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'document') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('message', formData.message);
    if (formData.document) {
      data.append('document', formData.document);
    }

    try {
      const response = await fetch('http://localhost:200/api/contact/makecontact', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        alert('Message sent successfully!');
        setFormData({ name: '', email: '', message: '', document: null });
      } else {
        const errorData = await response.json();
        alert('Failed to send message: ' + errorData.error);
      }
    } catch (error) {
      alert('Error sending message.');
    }
  };

  return (
    <section className={`container ${styles.auth}`}>
      <Card>
        <div className={styles.form}>
          <h2>Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              id="message"
              name="message"
              rows="4"
              cols="50"
              placeholder="Drop Your message here"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <p>Attach document</p>
            <input
              type="file"
              name="document"
              onChange={handleChange}
            />
            <button type="submit" className="--btn --btn-primary --btn-block">Send</button>
          </form>
        </div>
      </Card>
    </section>
  );
};

export default Contact;
