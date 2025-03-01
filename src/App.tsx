import { MantineProvider, Checkbox, createTheme } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header, Footer } from './components'
import checkboxClasses from './components/CheckPolicy/index.module.scss'
import ScrollResetProvider from './lib/ScrollResetProvider'
import TextFormatProvider from './lib/TextFormatProvider'
import * as routes from './lib/routes'
import { Main, About, Infusion, InfusionCatalog, Contacts } from './pages'
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
          <ScrollResetProvider>
            <Routes>
              <Route path={routes.getMainRoute()} element={<Main />} />
              <Route path={routes.getAboutRoute()} element={<About />} />
              <Route path={routes.getContactsRoute()} element={<Contacts />} />
              <Route path={routes.getInfusionCatalogRoute()} element={<InfusionCatalog />} />
              <Route path={routes.getInfusionRoute(routes.infusionRouteParams)} element={<Infusion />} />
            </Routes>
          </ScrollResetProvider>
          <Footer />
        </BrowserRouter>
      </TextFormatProvider>
    </MantineProvider>
  )
}

export default App
