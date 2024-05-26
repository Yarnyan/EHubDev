import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '../layout/Layout.tsx'
import { AUTHORIZATION_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE, RESUMEBUILDER_ROUTE } from '../../consts/routes.ts'
import { AuthorizationPage } from '../../pages/Authorization-page.tsx'
import { ProfilePage } from '../../pages/Profile-page.tsx'
import { BuilderPage } from '../../pages/Builder-page.tsx'

export const RootRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to={REGISTRATION_ROUTE} replace />} />
        <Route path={REGISTRATION_ROUTE} element={<AuthorizationPage />} />
        <Route path={AUTHORIZATION_ROUTE} element={<AuthorizationPage />} />
        <Route path={PROFILE_ROUTE} element={<ProfilePage />} />
        <Route path={RESUMEBUILDER_ROUTE} element={<BuilderPage />} />
      </Route>
    </Routes>
  )
}
