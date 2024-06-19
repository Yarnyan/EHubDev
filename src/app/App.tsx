import { RootRouter } from './routes/Root-router.tsx'
import './app.css'
import { theme } from './theme/theme.ts'
import { ThemeProvider } from '@mui/material'
<<<<<<< HEAD
import { createSignalRContext } from "react-signalr/signalr";
=======
import { useGetCurrentUserDataQuery } from '../api/user-api.ts'
>>>>>>> eb463f0c9de25905f5bf858ecd1120a9013b9c11

const SignalRContext = createSignalRContext();
export const App = () => {
<<<<<<< HEAD

  const { token } = '11'
=======
  useGetCurrentUserDataQuery(localStorage.getItem('token'))

>>>>>>> eb463f0c9de25905f5bf858ecd1120a9013b9c11
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