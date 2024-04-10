import { createTheme } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles/createPalette'

declare module '@mui/material/styles' {
  interface Theme {
    palette: PaletteOptions
  }

  interface ThemeOptions {
    palette?: PaletteOptions
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FDFDFD',
    },
    secondary: {
      main: '#8BC072',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {

  },
})
