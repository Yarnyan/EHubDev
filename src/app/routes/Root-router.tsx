import { Route, Routes } from 'react-router-dom'
import { Layout } from '../layout/Layout.tsx'
import { AUTHORIZATION_ROUTE, REGISTRATION_ROUTE } from '../../consts/routes.ts'
import { AuthorizationPage } from '../../pages/Authorization-page.tsx'

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path={REGISTRATION_ROUTE} element={<AuthorizationPage />} />
        <Route path={AUTHORIZATION_ROUTE} element={<AuthorizationPage />} />
      </Route>
    </Routes>
  )
}
