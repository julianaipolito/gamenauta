import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Importa o useNavigate do react-router-dom
import "../styles.css";
import astronautLogo from '../assets/game.jpg'; 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();  // Hook para navegação programática

  const handleLogin = (e) => {
    e.preventDefault();  // Impede o comportamento padrão do formulário
    navigate("/catalogo");
  };

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form" onSubmit={handleLogin}>
          <img src={astronautLogo} alt="Astronaut Logo" className="astronaut-logo" />
            <span className="login-form-title">Bem-vindo!</span>

            <div className="wrap-input">
              <input
                className={email !== "" ? "has-val input" : "input"}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Email"></span>
            </div>

            <div className="wrap-input">
              <input
                className={password !== "" ? "has-val input" : "input"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Password"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn">Login</button>
            </div>

            <div className="text-center">
              <span className="txt1">Acessar o catálogo? </span>
              <Link className="txt2" to="/catalogo"> 
                Catálogo de Produtos
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
