import { MantineProvider, Checkbox, createTheme } from '@mantine/core'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { Header, Footer, CookieModal, Telegram } from './components'
import checkboxClasses from './components/CheckPolicy/index.module.scss'
import ScrollResetProvider from './lib/ScrollResetProvider'
import TextFormatProvider from './lib/TextFormatProvider'
import * as routes from './lib/routes'
import { Main, About, Infusion, InfusionCatalog, Contacts, License, PrivacyPolicy, Documents, Admin, Success } from './pages'
import '@mantine/core/styles.css'
import './styles/global.scss'

const theme = createTheme({
  cursorType: 'pointer',
  components: {
    Checkbox: Checkbox.extend({ classNames: checkboxClasses }),
  },
})

const Layout = () => {
  const location = useLocation()
  return (
    <>
      <Header />
      <CookieModal />
      <Telegram />
      <ScrollResetProvider>
        <Routes>
          <Route path={routes.getMainRoute()} element={<Main />} />
          <Route path={routes.getAboutRoute()} element={<About />} />
          <Route path={routes.getContactsRoute()} element={<Contacts />} />
          <Route path={routes.getInfusionCatalogRoute()} element={<InfusionCatalog />} />
          <Route path={routes.getInfusionRoute(routes.infusionRouteParams)} element={<Infusion />} />
          <Route path={routes.getLicenseRoute()} element={<License />} />
          <Route path={routes.getPolicyRoute()} element={<PrivacyPolicy />} />
          <Route path={routes.getDocumentsRoute()} element={<Documents />} />
          <Route path={routes.getAdminRoute()} element={<Admin />} />
          <Route path={routes.getSuccessRoute()} element={<Success />} />
        </Routes>
      </ScrollResetProvider>
      {location.pathname !== routes.getSuccessRoute() && <Footer />}
    </>
  )
}

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <TextFormatProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </TextFormatProvider>
    </MantineProvider>
  )
}

export default App
