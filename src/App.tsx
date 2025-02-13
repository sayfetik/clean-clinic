import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components'
import * as routes from './lib/routes'
import { Main, About, Infusion, InfusionCatalog } from './pages'
import './styles/global.scss'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={routes.getMainRoute()} element={<Main />} />
        <Route path={routes.getAboutRoute()} element={<About />} />
        <Route path={routes.getInfusionCatalogRoute()} element={<InfusionCatalog />} />
        <Route path={routes.getInfusionRoute(routes.infusionRouteParams)} element={<Infusion />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
