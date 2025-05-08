import { MantineProvider } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom'
import * as mainPageApi from './api/MainAPI'
import { Header, Footer, CookieModal, Telegram, HeaderAdmin, ModalAdmin, VideoWidget } from './components'
import { useAuth } from './context/AuthContext'
import { AuthProvider } from './context/AuthContext'
import ScrollResetProvider from './lib/ScrollResetProvider'
import TextFormatProvider from './lib/TextFormatProvider'
import * as routes from './lib/routes'
import {
  Main,
  About,
  Infusion,
  InfusionCatalog,
  Contacts,
  License,
  PrivacyPolicy,
  Documents,
  Admin,
  Success,
  Error,
  Massage,
  Solarium,
  HomeVisit,
  Plasmolifting,
  Cryotherapy,
  Analyzes,
} from './pages'
import '@mantine/core/styles.css'
import './styles/global.scss'
import * as themes from './styles/themes'
// eslint-disable-next-line import/order
import { emptyMainPage } from './lib/empty'

const theme = themes.mantine

const Layout = () => {
  const location = useLocation()
  const [modalOpened, setModalOpened] = useState(false)
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const [main, setMain] = useState(emptyMainPage)

  useHotkeys([['alt+w', () => setModalOpened(true)]])

  const handleSuccess = () => {
    setModalOpened(false)
    navigate('/admin')
  }

  useEffect(() => {
    const fetchMainPage = async () => {
      const data = await mainPageApi.getMainPage()
      setMain(data)
    }

    fetchMainPage()
  }, [])

  if (loading) {
    return null
  }

  return (
    <>
      {location.pathname !== routes.getAdminRoute() ? <Header /> : <HeaderAdmin />}
      <CookieModal />
      <ModalAdmin opened={modalOpened} onClose={() => setModalOpened(false)} onSuccess={handleSuccess} />
      <VideoWidget />
      {location.pathname !== routes.getAdminRoute() && <Telegram />}
      <ScrollResetProvider>
        <Routes>
          <Route path={routes.getMainRoute()} element={<Main main={main} />} />
          <Route path={routes.getAboutRoute()} element={<About />} />
          <Route path={routes.getContactsRoute()} element={<Contacts />} />
          <Route
            path={routes.getInfusionCatalogRoute()}
            element={
              <InfusionCatalog
                problemImage={main.problemImage}
                problemTitle={main.problemTitle}
                problems={main.problems}
              />
            }
          />
          <Route path={routes.getMassageRoute()} element={<Massage />} />
          <Route path={routes.getSolariumRoute()} element={<Solarium />} />
          <Route path={routes.getHomeVisitRoute()} element={<HomeVisit />} />
          <Route path={routes.getPlasmoliftingRoute()} element={<Plasmolifting />} />
          <Route path={routes.getCryotherapyRoute()} element={<Cryotherapy />} />
          <Route path={routes.getAnalyzesgRoute()} element={<Analyzes />} />
          <Route path={routes.getInfusionRoute(routes.infusionRouteParams)} element={<Infusion />} />
          <Route path={routes.getLicenseRoute()} element={<License />} />
          <Route path={routes.getPolicyRoute()} element={<PrivacyPolicy />} />
          <Route path={routes.getDocumentsRoute()} element={<Documents />} />
          <Route
            path={routes.getAdminRoute()}
            element={isAuthenticated ? <Admin /> : <Navigate to={routes.getMainRoute()} />}
          />
          <Route path={routes.getSuccessRoute()} element={<Success />} />
          <Route path={routes.getErrorRoute()} element={<Error />} />
        </Routes>
      </ScrollResetProvider>
      {location.pathname !== routes.getSuccessRoute() &&
        location.pathname !== routes.getErrorRoute() &&
        location.pathname !== routes.getAdminRoute() && <Footer title={main.form.title} />}
    </>
  )
}

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <TextFormatProvider>
        <BrowserRouter>
          <AuthProvider>
            <Layout />
          </AuthProvider>
        </BrowserRouter>
      </TextFormatProvider>
    </MantineProvider>
  )
}

export default App
