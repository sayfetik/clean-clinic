import { MantineProvider } from '@mantine/core'
import { useHotkeys } from '@mantine/hooks'
import { Notifications } from '@mantine/notifications'
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useLocation, useNavigate, Navigate } from 'react-router-dom'
import * as contactsApi from './api/ContactsAPI'
import * as documentsApi from './api/DocumentsAPI'
import * as infusionsApi from './api/InfusionsAPI'
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
import { emptyContacts, emptyDocumentType, emptyInfusionCatalog, emptyMainPage } from './lib/empty'
// eslint-disable-next-line import/order
import { DocumentType } from './lib/types'

const theme = themes.mantine

const Layout = () => {
  const location = useLocation()
  const [modalOpened, setModalOpened] = useState(false)
  const { isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()
  const [main, setMain] = useState(emptyMainPage)
  const [infusionCatalog, setInfusionCatalog] = useState(emptyInfusionCatalog)
  const [contacts, setContacts] = useState(emptyContacts)
  const [documents, setDocuments] = useState<DocumentType[]>([])
  const [license, setLicense] = useState<DocumentType>(emptyDocumentType)

  useHotkeys([[import.meta.env.VITE_ADMIN_KEYBINDING, () => setModalOpened(true)]])

  const handleSuccess = () => {
    setModalOpened(false)
    navigate('/admin')
  }

  useEffect(() => {
    mainPageApi.getMainPage().then(setMain)
    infusionsApi.getInfusionCatalog().then(setInfusionCatalog)
    contactsApi.getContacts().then(setContacts)
    documentsApi.getDocuments().then((docs) => {
    setDocuments(docs)
    const license1 = docs.find(
      (doc) => typeof doc.title === 'string' && doc.title.toLowerCase().includes('лицензия')
    )
    if (license1) {setLicense(license1)}
  })
  }, [])

  if (loading) {
    return null
  }

  return (
    <>
      {location.pathname !== routes.getAdminRoute() ? <Header contacts={contacts} /> : <HeaderAdmin />}
      <CookieModal />
      <ModalAdmin opened={modalOpened} onClose={() => setModalOpened(false)} onSuccess={handleSuccess} />
      <VideoWidget isAuthenticated={isAuthenticated} />
      {location.pathname !== routes.getAdminRoute() && <Telegram />}
      <ScrollResetProvider>
        <Routes>
          <Route path={routes.getMainRoute()} element={<Main main={main} />} />
          <Route path={routes.getAboutRoute()} element={<About main={main} setMain={setMain} license={license || emptyDocumentType} />} />
          <Route path={routes.getContactsRoute()} element={<Contacts contacts={contacts} />} />
          <Route
            path={routes.getInfusionCatalogRoute()}
            element={
              <InfusionCatalog
                problemImage={main.problemImage}
                problemTitle={main.problemTitle}
                problems={main.problems}
                data={infusionCatalog}
              />
            }
          />
          <Route path={routes.getMassageRoute()} element={<Massage />} />
          <Route path={routes.getSolariumRoute()} element={<Solarium />} />
          <Route path={routes.getHomeVisitRoute()} element={<HomeVisit />} />
          <Route path={routes.getPlasmoliftingRoute()} element={<Plasmolifting />} />
          <Route path={routes.getCryotherapyRoute()} element={<Cryotherapy />} />
          <Route path={routes.getAnalyzesgRoute()} element={<Analyzes />} />
          <Route
            path={routes.getInfusionRoute(routes.infusionRouteParams)}
            element={<Infusion infusionInstructions={main.infusionInstructions} />}
          />
          <Route path={routes.getPolicyRoute()} element={<PrivacyPolicy />} />
          <Route path={routes.getDocumentsRoute()} element={<Documents documents={documents} license={license || emptyDocumentType}/>} />
          <Route
            path={routes.getAdminRoute()}
            element={
              isAuthenticated ? (
                <Admin
                  main={main}
                  setMain={setMain}
                  infusionCatalog={infusionCatalog}
                  setInfusionCatalog={setInfusionCatalog}
                  documents={documents}
                  setDocuments={setDocuments}
                />
              ) : (
                <Navigate to={routes.getMainRoute()} />
              )
            }
          />
          <Route path={routes.getSuccessRoute()} element={<Success />} />
          <Route path={routes.getErrorRoute()} element={<Error />} />
        </Routes>
      </ScrollResetProvider>
      {location.pathname !== routes.getSuccessRoute() &&
        location.pathname !== routes.getErrorRoute() &&
        location.pathname !== routes.getAdminRoute() && <Footer title={main.form.title} contacts={contacts} license={license || emptyDocumentType}/>}
    </>
  )
}

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <TextFormatProvider>
        <BrowserRouter>
          <AuthProvider>
            <Notifications position="top-right" limit={3} />
            <Layout />
          </AuthProvider>
        </BrowserRouter>
      </TextFormatProvider>
    </MantineProvider>
  )
}

export default App
