import React, {useState} from 'react';
import './GamePass.css'; // Import the CSS file

function GamePass() {
  return (
    <div className="gamepass-container">
      <h1 className="gamepass-title"> Gamenauta GamePass </h1>
      <div className="gamepass-content">
        <div className="gamepass-item">
          <h2 className="gamepass-subtitle">Jogos</h2>
          <p>O Game Pass oferece acesso a centenas de jogos de alta qualidade, incluindo novos jogos no primeiro dia.</p>
        </div>
        <div className="gamepass-item">
          <h2 className="gamepass-subtitle">Multijogador</h2>
          <p>O Game Pass permite jogar com amigos no console online.</p>
        </div>
        <div className="gamepass-item">
          <h2 className="gamepass-subtitle">EA Play</h2>
          <p>O Game Pass Ultimate inclui uma assinatura do EA Play, que oferece acesso a séries como F1, Battlefield™ e STAR WARS™.</p>
        </div>
        <div className="gamepass-item">
          <h2 className="gamepass-subtitle">Descontos e ofertas</h2>
          <p>O Game Pass oferece descontos e ofertas para membros.</p>
        </div>
        <div className="gamepass-item">
          <h2 className="gamepass-subtitle">Jogos na nuvem</h2>
          <p>O Game Pass Ultimate permite jogar em vários dispositivos na nuvem.</p>
        </div>
        <div className="gamepass-item">
          <h2 className="gamepass-subtitle">Benefícios da Riot Games</h2>
          <p>O Game Pass Ultimate desbloqueia os benefícios da Riot Games.</p>
        </div>
        <div className="gamepass-price-section">
          <h2 className="gamepass-price">Tudo isso por um plano mensal por apenas <span>R$29,90</span></h2>
          <h3 className="gamepass-question">Deseja assinar?</h3>
          <button className="subscribe-button">Assinar</button>
        </div>
      </div>
    </div>
  );
}

export default GamePass;