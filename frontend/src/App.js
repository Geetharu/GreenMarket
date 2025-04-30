import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Register from './pages/Register';
import Login from './pages/Login';
import Products from './pages/Products';
import AddProduct from './pages/AddProduct';
import Contact from './pages/Contact';
import Cart from './pages/Cart';

function App() {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Navbar />
      <div className="main-content" style={{ minHeight: '80vh', paddingBottom: '30px' }}>
        <Routes>
          <Route path="/" element={<Products cart={cart} setCart={setCart} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
