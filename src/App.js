import React from "react";
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Catalogo from "./components/Catalogo";
import GamePass from "./components/GamePass";
import GameDetails from "./components/GameDetails"; 
import Carrinho from "./components/Carrinho"; 
import './styles.css';

function NavBar() {
  return (
    <nav className="nav">
      <Link to="/">Login</Link>
      <Link to="/catalogo">Catálogo</Link>
      <Link to="/gamepass">Game Pass</Link>
      <Link to="/cart">🛒 Carrinho</Link> 
    </nav>
  );
}

function App() {
  const location = useLocation();

  return (
    <div className="app">
      {location.pathname !== '/' && <NavBar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/catalogo" element={<Catalogo />} />
        <Route path="/gamepass" element={<GamePass />} />
        <Route path="/game/:id" element={<GameDetails />} /> 
        <Route path="/cart" element={<Carrinho />} /> 
      </Routes>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
