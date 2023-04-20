import { useEffect, useState } from 'react';
import { fetchTrendMovies } from '../services/api';
import MovieList from 'components/MovieList/MovieList'; // компонент для відображення списку фільмів
import { LoadingIndicator } from 'components/SharedLayout/LoadingDots'; // індикатор завантаження

const Home = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // додаємо запит на трендові фільми
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        setError(false);
        setIsLoading(true);
        const { results } = await fetchTrendMovies();
        setTrendingMovies(results); // записуємо в стейт
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  return (
    <>
      {/* додаємо перевірку на стан завантаження */}
      {isLoading ? (
        <LoadingIndicator />
      ) : error ? (
        <p>
          Sorry, we could not fetch the trending movies. Please try again later.
        </p>
      ) : (
        <MovieList trendingMovies={trendingMovies} />
      )}
    </>
  );
};

export default Home;

// Діма Берестень
