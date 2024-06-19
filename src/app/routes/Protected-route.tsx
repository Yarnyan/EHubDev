import { ReactNode } from 'react'
import { useAppSelector } from '../../hooks/redux-hooks.ts'
import { Navigate } from 'react-router-dom'
import { REGISTRATION_ROUTE } from '../../consts/routes.ts'
import { CircularProgress } from '@mui/material'

export const ProtectedRoute = (props: { children: ReactNode }) => {
  const  user  = useAppSelector((state) => state.userReducer.user)

  if (user != 'unknown') {
    return <CircularProgress size={56} color='secondary' sx={{margin: 'auto'}}/>
  }

  if (!user) {
    return <Navigate to={REGISTRATION_ROUTE} replace />
  }

  return props.children
}