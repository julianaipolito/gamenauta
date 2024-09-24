const API_KEY = '74f572bfe3024b5ca0b8980bf706d686'; // Substitua pela sua chave da API RAWG
const BASE_URL = 'https://api.rawg.io/api';

export const fetchGames = async (page = 1) => {
    try {
        const response = await fetch(`${BASE_URL}/games?key=${API_KEY}&page=${page}&page_size=20`);
        if (!response.ok) {
            throw new Error('Erro ao buscar dados da API');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Erro ao buscar jogos:', error);
        throw error;
    }
};
