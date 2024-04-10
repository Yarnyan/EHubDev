import { RootRouter } from './routes/Root-router.tsx'
import './app.css'
import { theme } from './theme/theme.ts'
import { ThemeProvider } from '@mui/material'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RootRouter />
    </ThemeProvider>
  )
}