import { MantineProvider, Checkbox, createTheme } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header, Footer, CookieModal, Telegram } from './components'
import checkboxClasses from './components/CheckPolicy/index.module.scss'
import ScrollResetProvider from './lib/ScrollResetProvider'
import TextFormatProvider from './lib/TextFormatProvider'
import * as routes from './lib/routes'
import { Main, About, Infusion, InfusionCatalog, Contacts, License, PrivacyPolicy, Documents, Admin } from './pages'
import '@mantine/core/styles.css'
import './styles/global.scss'

const theme = createTheme({
  cursorType: 'pointer',
  components: {
    Checkbox: Checkbox.extend({ classNames: checkboxClasses }),
  },
})

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <TextFormatProvider>
        <BrowserRouter>
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
            </Routes>
          </ScrollResetProvider>
          <Footer />
        </BrowserRouter>
      </TextFormatProvider>
    </MantineProvider>
  )
}

export default App
