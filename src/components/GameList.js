import React, { useEffect, useState } from 'react';
import { fetchGames } from './services/Api.js'; // Ajuste o caminho se necessário
import './GameList.css';

const GameList = ({ searchTerm }) => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(200); // Você pode ajustar o tamanho da página aqui

    useEffect(() => {
        const loadGames = async () => {
            try {
                const data = await fetchGames(page, pageSize);
                setGames(prevGames => [...prevGames, ...data.results]);
            } catch (err) {
                console.error('Erro ao carregar jogos:', err.response ? err.response.data : err.message);
                setError('Erro ao carregar jogos');
            } finally {
                setLoading(false);
            }
        };

        loadGames();
    }, [page]);

    const loadMoreGames = () => {
        setPage(prevPage => prevPage + 1); // Aumenta a página para carregar mais jogos
    };

    const filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Lista de Jogos</h2>
            <div className="game-list">
                {filteredGames.length > 0 ? (
                    filteredGames.map(game => (
                        <div key={game.id} className="game-item">
                            <img src={game.background_image} alt={game.name} className="game-image" />
                            <h3>{game.name}</h3>
                            <a href={`https://rawg.io/games/${game.slug}`} target="_blank" rel="noopener noreferrer">
                                Mais Informações
                            </a>
                        </div>
                    ))
                ) : (
                    <p>Nenhum jogo encontrado.</p>
                )}
            </div>
            <button onClick={loadMoreGames}>Carregar mais jogos</button>
        </div>
    );
};

export default GameList;
