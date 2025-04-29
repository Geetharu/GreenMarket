import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './AddProduct.css';

function AddProduct() {
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { title, price, description } = formData;

    if (!title || title.trim().length < 2) {
      Swal.fire('Invalid Title', 'Product title must be at least 2 characters.', 'warning');
      return false;
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      Swal.fire('Invalid Price', 'Price must be a valid positive number.', 'warning');
      return false;
    }

    if (!description || description.length < 5) {
      Swal.fire('Invalid Description', 'Description must be at least 5 characters long.', 'warning');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await axios.post('http://localhost:5000/api/products', {
        title: formData.title,
        price: Number(formData.price),
        description: formData.description
      });
      Swal.fire('Product Added!', res.data.message, 'success');
      setFormData({ title: '', price: '', description: '' });
    } catch (err) {
      Swal.fire('Error', err.response?.data?.message || 'Failed to add product', 'error');
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-box">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <label>🛍️ Product Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="e.g., Fresh Mangoes" />

          <label>💰 Price (Rs)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g., 250" />

          <label>📝 Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="e.g., Sweet and juicy mangoes from Jaffna"></textarea>

          <button type="submit">Add Product</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
