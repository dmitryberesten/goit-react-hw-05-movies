import React, { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom'; // додаємо хук для роботи з параметрами URL
import { toast } from 'react-hot-toast'; // імпортуємо плагін для сповіщень
import { fetchMovieByName } from '../services/api';
import SearchMovies from '../components/SearchMovies/SearchMovies';
import {
  List,
  ListItem,
  SectionTitle,
  StyledLink,
  StyledSection,
} from '../components/MovieList/MovieList.styled'; // імпортуємо стилі

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  // додаємо запит на фільм
  useEffect(() => {
    const query = searchParams.get('query') ?? ''; // щоб не було помилки, якщо query не буде в URL
    if (!query) return;

    // додаємо сповіщення про пошук
    const getMovie = async () => {
      try {
        const { results } = await fetchMovieByName(query);

        // додаємо сповіщення, якщо фільмів не знайдено
        if (results.length === 0) {
          toast.dismiss(); // очищаємо попереднє сповіщення
          toast.error('No movies found');
          setMovies([]); // очищаємо масив фільмів
        } else {
          setMovies(results); // записуємо масив фільмів
        }
      } catch (error) {
        toast.error(error.message);
        setMovies([]);
      }
    };

    // додаємо запит на фільм
      getMovie();
  }, [searchParams]);

  // додаємо функцію для пошуку фільму
  const handleSubmit = query => {
    setSearchParams({ query }); // записуємо query в URL
  };

  return (
    <main>
      <StyledSection>
        <SectionTitle>Movies Page</SectionTitle>

        <SearchMovies onSubmit={handleSubmit} /> {/* додаємо компонент для пошуку фільму */}

        <List>
          {movies.map(movie => (
            <ListItem key={movie.id}>

              {/* додаємо посилання на сторінку фільму */}
              <StyledLink to={`/movies/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </StyledLink>
            </ListItem>
          ))}
        </List>
      </StyledSection>
    </main>
  );
};

export default Movies;

// Діма Берестень
