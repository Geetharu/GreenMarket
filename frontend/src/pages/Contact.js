import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, message } = formData;
    if (!name || name.length < 2) {
      Swal.fire('Invalid Name', 'Please enter your name.', 'warning');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire('Invalid Email', 'Please enter a valid email address.', 'warning');
      return false;
    }

    if (!message || message.length < 10) {
      Swal.fire('Message Too Short', 'Please write at least 10 characters.', 'warning');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/contacts', formData);
      Swal.fire('Thank You!', res.data.message, 'success');
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      Swal.fire('Oops!', err.response?.data?.message || 'Failed to send message', 'error');
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-box">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <label>👤 Your Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />

          <label>📧 Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />

          <label>✉️ Your Message</label>
          <textarea name="message" value={formData.message} onChange={handleChange} placeholder="How can we help you?" />

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
