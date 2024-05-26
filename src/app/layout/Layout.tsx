import { Outlet } from 'react-router-dom';
import { Container } from '@mui/material';
import { Footer } from '../../modules/footer/Footer.tsx';
import { Header } from '../../modules/header/Header.tsx';

export const Layout = () => {
  return (
    <Container
      sx={{
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
      disableGutters
    >
      <Header />

      <Container
        component='main'
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <Outlet />
      </Container>
      <Footer />
    </Container>
  );
};