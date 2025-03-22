import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from "react-helmet-async";
import App from './App.tsx'

const helmetContext = {};

createRoot(document.getElementById('root')!).render(
  <HelmetProvider context={helmetContext}>
    <StrictMode>
      <App />
    </StrictMode>
  </HelmetProvider>
)
