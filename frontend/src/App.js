// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Air from './pages/Air';
import Trafic from './pages/Trafic';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
         <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/air" element={<Air />} />
        <Route path="/trafic" element={<Trafic />} />
      </Routes>
    </Router>
  );
}

export default App;