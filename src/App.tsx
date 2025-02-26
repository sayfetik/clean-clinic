import { MantineProvider, Checkbox, createTheme } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header, Footer } from './components'
import checkboxClasses from './components/CheckPolicy/index.module.scss'
import * as routes from './lib/routes'
import { Main, About, Infusion, InfusionCatalog, Contacts } from './pages'
import '@mantine/core/styles.css'

const theme = createTheme({
  cursorType: 'pointer',
  components: {
    Checkbox: Checkbox.extend({ classNames: checkboxClasses }),
  },
})
import './styles/global.scss'

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path={routes.getMainRoute()} element={<Main />} />
          <Route path={routes.getAboutRoute()} element={<About />} />
          <Route path={routes.getContactsRoute()} element={<Contacts />} />
          <Route path={routes.getInfusionCatalogRoute()} element={<InfusionCatalog />} />
          <Route path={routes.getInfusionRoute(routes.infusionRouteParams)} element={<Infusion />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MantineProvider>
  )
}

export default App
