import { Suspense } from 'react'; // додаємо бібліотеку для lazy
import { useEffect, useState } from 'react'; // додаємо бібліотеку для хуків
import { useParams, Outlet, useLocation, Link } from 'react-router-dom'; // додаємо бібліотеку для роботи з адресою
import { BsArrowLeftShort } from 'react-icons/bs'; // додаємо бібліотеку для іконки
import { fetchMovieById } from '../services/api'; // додаємо запит на фільм
import MovieCard from '../components/MovieCard/MovieCard';
import { Button, Container } from './MovieDelails.styled';
import { LoadingIndicator } from 'components/SharedLayout/LoadingDots';

const MovieDelails = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const [selectedMovie, setSelectedMovie] = useState({});

  // додаємо запит на фільм
  useEffect(() => {
    const fetchSelectedMovie = async movieId => {
      try {
        const movieData = await fetchMovieById(movieId);
        setSelectedMovie(movieData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSelectedMovie(movieId);
  }, [movieId]);

  return (
    <main>
      <Container>

        {/* додаємо кнопку для повернення на попередню сторінку */}
        <Link to={location?.state?.from ?? '/'}>
          <Button type="button">
            <BsArrowLeftShort
              style={{ width: '25px', height: '25px', display: 'inline-block' }}
            />
            Go back
          </Button>
        </Link>

        <MovieCard movie={selectedMovie} /> {/* додаємо компонент для відображення фільму */}

        {/* додаємо відкладений рендеринг дочірніх компонентів */}
        <Suspense fallback={<LoadingIndicator />}>
          <Outlet />
        </Suspense>
      </Container>
    </main>
  );
};

export default MovieDelails;

// Діма Берестень
