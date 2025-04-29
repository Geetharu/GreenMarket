import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [currentImage, setCurrentImage] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce', // Fruits
    'https://images.unsplash.com/photo-1600891964599-f61ba0e24092', // Vegetables 
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        setError('Failed to load products');
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()) ||
    product.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImages[currentImage]})` }}
      >
        <div className="hero-content">
          <h1>Welcome to GreenMarket 🌿</h1>
          <p>Fresh organic products at your fingertips</p>
          <a href="#products" className="hero-button">Shop Now</a>
        </div>
      </section>

      {/* PRODUCTS SECTION */}
      <motion.div
        className="products-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2 id="products">Our Products</h2>

        <input
          type="text"
          placeholder="🔍 Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-bar"
        />

        {error && <p className="error">{error}</p>}

        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                className="product-card"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <h3>{product.title}</h3>
                <p className="price">Rs. {product.price}</p>
                <p className="description">{product.description}</p>
              </motion.div>
            ))
          ) : (
            <motion.div
              className="product-card no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3>No products found</h3>
              <p>Try a different search keyword.</p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
}

export default Products;
