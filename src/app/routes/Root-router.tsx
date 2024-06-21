import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from '../layout/Layout.tsx'
import {
  AUTHORIZATION_ROUTE,
  PORTFOLIO_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  RESUMEBUILDER_ROUTE,
  SEARCH_ROUTE,
  CHAT_ROUTE, JOBS_ROUTE,
} from '../../consts/routes.ts'
import { AuthorizationPage } from '../../pages/Authorization-page.tsx'
import { ProfilePage } from '../../pages/Profile-page.tsx'
import { BuilderPage } from '../../pages/Builder-page.tsx'
import { SearchPage } from '../../pages/Search-page.tsx'
import { ProtectedRoute } from './Protected-route.tsx'
import { PortfolioPage } from '../../pages/Portfolio-page.tsx'
import { ChatPage } from '../../pages/Chat-page.tsx'
import { JobsPage } from '../../pages/Jobs-page.tsx'

export const RootRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Navigate to={'/profile'} replace />} />
        <Route path={PROFILE_ROUTE} element={<ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>} />
        <Route path={RESUMEBUILDER_ROUTE} element={<ProtectedRoute>
          <BuilderPage />
        </ProtectedRoute>} />
        <Route path={JOBS_ROUTE} element={<ProtectedRoute>
          <JobsPage />
        </ProtectedRoute>} />
        <Route path={PORTFOLIO_ROUTE} element={<ProtectedRoute>
          <PortfolioPage />
        </ProtectedRoute>} />
        <Route path={SEARCH_ROUTE} element={<ProtectedRoute>
          <SearchPage />
        </ProtectedRoute>} />
        <Route path={CHAT_ROUTE} element={<ProtectedRoute>
          <ChatPage />
        </ProtectedRoute>} />
        <Route path={REGISTRATION_ROUTE} element={<AuthorizationPage />} />
        <Route path={AUTHORIZATION_ROUTE} element={<AuthorizationPage />} />
      </Route>
    </Routes>
  )
}
