import React, { useEffect, useState } from 'react';
import './Carrinho.css'; 

const Carrinho = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedItems);
  }, []);

  const handleRemoveFromCart = (id) => {
    const updatedItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
  };

  return (
    <div className="carrinho-container">
      <h1>Carrinho</h1>
      {cartItems.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <div>
          <ul className="carrinho-lista">
            {cartItems.map(item => (
              <li key={item.id} className="carrinho-item">
                <img src={item.background_image} alt={item.name} className="carrinho-game-image" />
                <h3 className="carrinho-game-title">{item.name}</h3>
                <button className="botao-remover" onClick={() => handleRemoveFromCart(item.id)}>
                  Remover
                </button>
              </li>
            ))}
          </ul>
          <button className="botao-limpar" onClick={handleClearCart}>
            Limpar Carrinho
          </button>
        </div>
      )}
    </div>
  );
};

export default Carrinho;

