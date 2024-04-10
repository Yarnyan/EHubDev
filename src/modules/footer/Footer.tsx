import { Box, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <Box
      component='footer'
      bgcolor='secondary.main'
      flexGrow={1}
      sx={{
        height: '184px',
        display: 'flex',
        mt: 'auto',
      }}
    >
      <Typography
        component='span'
        fontSize={32}
        sx={{
          margin: 'auto',
        }}
      >
        Footer
      </Typography>
    </Box>
  )
}