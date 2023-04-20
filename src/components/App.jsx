import { Routes, Route, Navigate } from 'react-router-dom'; // додаємо маршрутизацію
import { lazy } from 'react';
import { Toaster } from 'react-hot-toast'; // додаємо сповіщення

const SharedLayout = lazy(() => import('./SharedLayout/SharedLayout')); // додаємо лейаут
const Home = lazy(() => import('../pages/Home'));
const Movies = lazy(() => import('../pages/Movies'));
const MovieDetails = lazy(() => import('../pages/MovieDetails'));
const Cast = lazy(() => import('./Cast/Cast'));
const Reviews = lazy(() => import('./Reviews/Reviews'));

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />

          {/* додаємо динамічний роут */}
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
      <Toaster /> {/* додаємо сповіщення */}
    </>
  );
};

// Діма Берестень
