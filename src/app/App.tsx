import { RootRouter } from './routes/Root-router.tsx'
import './app.css'
import { theme } from './theme/theme.ts'
import { ThemeProvider } from '@mui/material'
import { createSignalRContext } from "react-signalr/signalr";

const SignalRContext = createSignalRContext();
export const App = () => {

  const { token } = '11'
  return (
    <SignalRContext.Provider
      connectEnabled={!!token}
      accessTokenFactory={() => token}
      dependencies={[token]} 
      url={"http://31.28.113.222:8444/chat"}
    >
      <ThemeProvider theme={theme}>
        <RootRouter />
      </ThemeProvider>
    </SignalRContext.Provider>
  )
}