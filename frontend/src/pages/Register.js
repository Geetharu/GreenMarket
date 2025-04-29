import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import './Register.css';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, password } = formData;
    let tempErrors = {};

    if (!name || name.trim().length < 2) {
      tempErrors.name = "Name must be at least 2 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      tempErrors.email = "Enter a valid email address.";
    }

    if (!password || password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/users/register', formData);
      Swal.fire('Registered!', res.data.message, 'success');
      setFormData({ name: '', email: '', password: '' });
      setErrors({});
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Registration failed', 'error');
    }
  };

  return (
    <motion.div 
      className="register-container"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="register-box">
        <h2>Create Your Account</h2>
        <form onSubmit={handleSubmit}>
          <label>👤 Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" />
          {errors.name && <small className="error">{errors.name}</small>}

          <label>✉️ Email Address</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" />
          {errors.email && <small className="error">{errors.email}</small>}

          <label>🔒 Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="At least 6 characters" />
          {errors.password && <small className="error">{errors.password}</small>}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Sign Up
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}

export default Register;
