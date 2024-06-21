import { RootRouter } from './routes/Root-router.tsx'
import './app.css'
import { theme } from './theme/theme.ts'
import { ThemeProvider } from '@mui/material'
import { useGetCurrentUserDataQuery } from '../api/user-api.ts'
import { createSignalRContext } from "react-signalr/signalr";

const SignalRContext = createSignalRContext()
export const App = () => {
  useGetCurrentUserDataQuery(localStorage.getItem('token'))

  const { token } = '11'
  
  return (
    <SignalRContext.Provider
      connectEnabled={!!token}
      accessTokenFactory={() => token}
      dependencies={[token]} 
      url={import.meta.env.VITE_API_CHAT_URL}
    >
      <ThemeProvider theme={theme}>
        <RootRouter />
      </ThemeProvider>
    </SignalRContext.Provider>
  )
}