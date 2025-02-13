import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAboutRoute, getInfusionCatalogRoute, getInfusionRoute, getMainRoute, infusionRouteParams } from './lib/routes'
import { Main, About, Infusion, InfusionCatalog } from './pages'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={getMainRoute()} element={<Main />} />
        <Route path={getAboutRoute()} element={<About />} />
        <Route path={getInfusionRoute(infusionRouteParams)} element={<Infusion />} />
        <Route path={getInfusionCatalogRoute()} element={<InfusionCatalog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
