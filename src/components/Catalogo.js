import React, { useState, useEffect } from 'react';
import { fetchGames } from '../services/Api'; // Caminho ajustado para a pasta services
import './Catalogo.css';
import { Link } from 'react-router-dom'; // Importa o Link do react-router-dom para navegação

const translations = {
  pt: {
    title: "Catálogo de Jogos Gamenauta!",
    searchPlaceholder: "Pesquisar jogos...",
    loadMore: "Carregar Mais Jogos",
    errorLoading: "Erro ao carregar jogos",
    viewDetails: "Ver Detalhes",
    darkMode: "Modo Escuro",
    lightMode: "Modo Claro",
    notification: "🔔",
    arabic: "Árabe",
    russian: "Russo",
    german: "Alemão",
    japanese: "Japonês",
    mandarin: "Mandarim",
    searchButton: "Pesquisar"
  },
  en: {
    title: "Gamenauta Game Catalog!",
    searchPlaceholder: "Search games...",
    loadMore: "Load More Games",
    errorLoading: "Error loading games",
    viewDetails: "View Details",
    darkMode: "Dark Mode",
    lightMode: "Light Mode",
    notification: "🔔",
    arabic: "Arabic",
    russian: "Russian",
    german: "German",
    japanese: "Japanese",
    mandarin: "Mandarin",
    searchButton: "Search"
  },
  ar: {
    title: "فهرس ألعاب غامينوتا!",
    searchPlaceholder: "ابحث عن الألعاب...",
    loadMore: "تحميل المزيد من الألعاب",
    errorLoading: "خطأ في تحميل الألعاب",
    viewDetails: "عرض التفاصيل",
    darkMode: "الوضع المظلم",
    lightMode: "الوضع الفاتح",
    notification: "🔔",
    arabic: "عربي",
    russian: "روسي",
    german: "ألماني",
    japanese: "ياباني",
    mandarin: "ماندارين",
    searchButton: "بحث"
  },
  ru: {
    title: "Каталог игр Gamenauta!",
    searchPlaceholder: "Искать игры...",
    loadMore: "Загрузить больше игр",
    errorLoading: "Ошибка загрузки игр",
    viewDetails: "Посмотреть детали",
    darkMode: "Темный режим",
    lightMode: "Светлый режим",
    notification: "🔔",
    arabic: "Арабский",
    russian: "Русский",
    german: "Немецкий",
    japanese: "Японский",
    mandarin: "Мандарин",
    searchButton: "Поиск"
  },
  de: {
    title: "Gamenauta Spielekatalog!",
    searchPlaceholder: "Spiele suchen...",
    loadMore: "Mehr Spiele laden",
    errorLoading: "Fehler beim Laden der Spiele",
    viewDetails: "Details ansehen",
    darkMode: "Dunkler Modus",
    lightMode: "Heller Modus",
    notification: "🔔",
    arabic: "Arabisch",
    russian: "Russisch",
    german: "Deutsch",
    japanese: "Japanisch",
    mandarin: "Mandarin",
    searchButton: "Suchen"
  },
  ja: {
    title: "Gamenauta ゲームカタログ！",
    searchPlaceholder: "ゲームを検索...",
    loadMore: "もっとゲームを読み込む",
    errorLoading: "ゲームの読み込み中にエラーが発生しました",
    viewDetails: "詳細を見る",
    darkMode: "ダークモード",
    lightMode: "ライトモード",
    notification: "🔔",
    arabic: "アラビア語",
    russian: "ロシア語",
    german: "ドイツ語",
    japanese: "日本語",
    mandarin: "普通話",
    searchButton: "検索"
  },
  zh: {
    title: "Gamenauta 游戏目录！",
    searchPlaceholder: "搜索游戏...",
    loadMore: "加载更多游戏",
    errorLoading: "加载游戏时出错",
    viewDetails: "查看详情",
    darkMode: "黑暗模式",
    lightMode: "亮模式",
    notification: "🔔",
    arabic: "阿拉伯语",
    russian: "俄语",
    german: "德语",
    japanese: "日语",
    mandarin: "普通话",
    searchButton: "搜索"
  }
};

const Catalogo = () => {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [language, setLanguage] = useState('pt'); // português
  const [darkMode, setDarkMode] = useState(false); // Modo escuro

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const newGames = await fetchGames(page);
        if (newGames.length > 0) {
          setGames((prevGames) => [...prevGames, ...newGames]);
        } else {
          setHasMore(false);
        }
      } catch (err) {
        setError(translations[language].errorLoading);
      } finally {
        setLoading(false);
      }
    };

    loadGames();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && hasMore && !loading) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore, loading]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const addToCart = (game) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const gameExists = cartItems.find(item => item.id === game.id);
    if (!gameExists) {
      cartItems.push(game);
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  };

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`catalog-container ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="catalog-title">{translations[language].title}</h1>
      <div className="language-container">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="language-select">
          <option value="pt">Português</option>
          <option value="en">Inglês</option>
          <option value="ar">Árabe</option>
          <option value="ru">Russo</option>
          <option value="de">Alemão</option>
          <option value="ja">Japonês</option>
          <option value="zh">Mandarim</option>
        </select>
        <button className="dark-mode-button" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? translations[language].lightMode : translations[language].darkMode}
        </button>
        <button className="notification-button" onClick={() => alert('Você será notificado!')}>
          {translations[language].notification}
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder={translations[language].searchPlaceholder}
          className="search-input"
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <div className="games-grid">
        {filteredGames.map((game) => (
          <div key={game.id} className="game-item">
            <img src={game.background_image} alt={game.name} className="game-image" />
            <h3 className="game-title">{game.name}</h3>
            <p className="game-description">{game.released}</p>
            <button className="botao-detalhes">
              <Link to={`/game/${game.id}`} className="game-link">{translations[language].viewDetails}</Link>
            </button>
            <div className="carrinho-container">
              <button onClick={() => addToCart(game)} className="botao-carrinho">🛒</button>
            </div>
          </div>
        ))}
      </div>
      {loading && <div>Carregando...</div>}
      {!hasMore && <div>Não há mais jogos para carregar.</div>}
    </div>
  );
};

export default Catalogo;
