import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { email, password } = formData;

    if (!email || !password) {
      Swal.fire('Missing Fields', 'Please enter both email and password.', 'warning');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Swal.fire('Invalid Email', 'Please enter a valid email address.', 'warning');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/users/login', formData);
      Swal.fire('Login Successful', res.data.message, 'success');
      setFormData({ email: '', password: '' });
    } catch (err) {
      Swal.fire('Login Failed', err.response?.data?.message || 'Invalid credentials', 'error');
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="login-box">
        <h2>Login to GreenMarket</h2>
        <form onSubmit={handleSubmit}>
          <label>✉️ Email</label>
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <label>🔒 Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Login
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default Login;
