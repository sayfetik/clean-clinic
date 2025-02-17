import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components'
import * as routes from './lib/routes'
import { Main, About, Infusion, InfusionCatalog, Contacts, Services } from './pages'
import './styles/global.scss'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={routes.getMainRoute()} element={<Main />} />
        <Route path={routes.getServicesRoute()} element={<Services />} />
        <Route path={routes.getAboutRoute()} element={<About />} />
        <Route path={routes.getContactsRoute()} element={<Contacts />} />
        <Route path={routes.getInfusionCatalogRoute()} element={<InfusionCatalog />} />
        <Route path={routes.getInfusionRoute(routes.infusionRouteParams)} element={<Infusion />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
