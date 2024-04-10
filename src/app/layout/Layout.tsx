import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'
import { Footer } from '../../modules/footer/Footer.tsx'
import { Header } from '../../modules/header/Header.tsx'

export const Layout = () => {
  return (
    <Container
      sx={{
        border: 1,
        borderColor: 'black',
        width: '1600px',
        minHeight: '100vh',
        display: 'flex',
        flexWrap: 'wrap',
      }}
      disableGutters>
      <Header />
      <Container component='main'>
        <Outlet />
      </Container>
      <Footer />
    </Container>
  )
}