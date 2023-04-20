import { Suspense } from 'react';
import { Outlet } from 'react-router-dom'; // додаємо компонент для рендерингу дочірніх компонентів
import { LoadingIndicator } from './LoadingDots'; // додаємо індикатор завантаження
import { StyledHeader, StyledNavLink } from './SharedLayout.styled'; // додаємо стилі

const SharedLayout = () => {
  return (
    <>
      <StyledHeader>
        <nav>
          <StyledNavLink to="/">Home</StyledNavLink>
          <StyledNavLink to="/movies">Movies</StyledNavLink>
        </nav>
      </StyledHeader>

      {/* відкладення рендерингу дочірніх компонентів, поки не буде завантажено весь код */}
      <Suspense fallback={<LoadingIndicator />}>
        <Outlet /> {/* рендеринг дочірніх компонентів */}
      </Suspense>
    </>
  );
};

export default SharedLayout;

// Діма Берестень
