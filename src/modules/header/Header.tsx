import { AppBar, Toolbar, Typography } from '@mui/material'


export const Header = () => {
  return (
    <AppBar
      component='header'
      sx={{
        height: '80px',
        position: 'relative'
      }}
    >
      <Toolbar>
        <Typography
          component='span'
          fontSize={32}
          sx={{
            margin: 'auto',
          }}
        >
          Header
        </Typography>
      </Toolbar>
    </AppBar>
  )
}