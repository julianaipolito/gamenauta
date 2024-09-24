import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './GameDetails.css'; // Não esqueça de importar o CSS

const API_KEY = '74f572bfe3024b5ca0b8980bf706d686';
const BASE_URL = 'https://api.rawg.io/api';

const GameDetails = () => {
  const { id } = useParams();
  const [gameDetails, setGameDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/games/${id}?key=${API_KEY}`);
        if (!response.ok) {
          throw new Error('Erro ao buscar detalhes do jogo');
        }
        const data = await response.json();
        setGameDetails(data);
      } catch (err) {
        setError('Erro ao carregar detalhes do jogo');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchGameDetails();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="game-details-container">
      <div className="game-details-image-container">
        <img
          src={gameDetails.background_image}
          alt={gameDetails.name}
          className="game-details-image"
        />
      </div>

      <div className="game-details-info">
        <h1>{gameDetails.name}</h1>
        <p><strong>Gênero:</strong> {gameDetails.genres.map(genre => genre.name).join(', ')}</p>
        <p><strong>Lançamento:</strong> {new Date(gameDetails.released).toLocaleDateString()}</p>
        <p><strong>Nota:</strong> {gameDetails.metacritic ? gameDetails.metacritic : 'Sem avaliação'}</p>
        <p><strong>Descrição:</strong> {gameDetails.description_raw}</p>
        
        
        <a href={gameDetails.website} target="_blank" rel="noopener noreferrer">
          Site Oficial
        </a>

      </div>
    </div>
  );
};

export default GameDetails;
