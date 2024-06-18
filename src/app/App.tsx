import { RootRouter } from './routes/Root-router.tsx'
import './app.css'
import { theme } from './theme/theme.ts'
import { ThemeProvider } from '@mui/material'
import { useGetCurrentUserDataQuery } from '../api/user-api.ts'

export const App = () => {
  useGetCurrentUserDataQuery(localStorage.getItem('token'))

  return (
    <ThemeProvider theme={theme}>
      <RootRouter />
    </ThemeProvider>
  )
}