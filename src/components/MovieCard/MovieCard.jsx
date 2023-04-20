import { useLocation } from 'react-router-dom'; // доступ до параметрів поточного URL
import PropTypes from 'prop-types';
import {
  Img,
  List,
  ListItem,
  MoreInfoHeader,
  MoreInfoWrapper,
  MovieCardContainer,
  MovieInfo,
  MovieInfoText,
  MovieInfoTextBold,
  MovieName,
  StyledLink,
} from './MovieCard.styled'; // додаємо стилі
import { LoadingIndicator } from 'components/SharedLayout/LoadingDots'; // додаємо індикатор завантаження

const MovieCard = ({ movie }) => {
  const { title, release_date, poster_path, vote_average, overview, genres } =
  movie;
  const location = useLocation(); // додаємо доступ до параметрів поточного URL
  const releaseDate = new Date(release_date);

  // перевіряємо чи дата валідна, якщо ні, то виводимо Unknown
  const releaseYear = isNaN(releaseDate)
    ? 'Unknown'
    : releaseDate.getFullYear();

  // додаємо перевірку на наявність постера
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w400/${poster_path}`
    : 'https://via.placeholder.com/400x600.png?text=Poster+Not+Available';

  // додаємо перевірку на наявність рейтингу
  const userScore = vote_average
    ? `${(vote_average * 10).toFixed(0)}%`
    : 'Not rated yet';

  // додаємо перевірку на наявність заголовку
  if (!title) {
    return <LoadingIndicator />;
  }

  return (
    <>
      <MovieCardContainer>
        <Img src={posterUrl} alt={`${title} poster`} />

        <MovieInfo>
          <MovieName>
            {title ?? 'Unknown'} ({releaseYear})
          </MovieName>
          <MovieInfoText>User Score: {userScore}</MovieInfoText>
          <MovieInfoText>
            <MovieInfoTextBold>Overview:</MovieInfoTextBold> {overview}
          </MovieInfoText>

          {/* додаємо перевірку на наявність жанрів */}
          {genres && genres.length > 0 && (
            <MovieInfoText>
              <MovieInfoTextBold>Genres:</MovieInfoTextBold>
              {genres.map(genre => genre.name).join(', ')}
            </MovieInfoText>
          )}
        </MovieInfo>

      </MovieCardContainer>

      <MoreInfoWrapper>
        <MoreInfoHeader>Additional information</MoreInfoHeader>

        <List>
          <ListItem>
            <StyledLink
              to="cast"
              state={{ from: location?.state?.from ?? '/' }} // додаємо параметр from для повернення на попередню сторінку
            >
              Cast
            </StyledLink>
          </ListItem>

          <ListItem>
            <StyledLink
              to="reviews"
              state={{ from: location?.state?.from ?? '/' }}
            >
              Reviews
            </StyledLink>
          </ListItem>
        </List>

      </MoreInfoWrapper>
    </>
  );
};

// додаємо перевірку на типи пропсів
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    poster_path: PropTypes.string.isRequired,
    vote_average: PropTypes.number,
    overview: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string.isRequired })
    ),
  }).isRequired,
};

export default MovieCard;

// Діма Берестень
