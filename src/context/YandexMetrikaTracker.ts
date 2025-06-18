import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const YandexMetrikaTracker = () => {
  const location = useLocation()

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).ym === 'function') {
      ;(window as any).ym(96720283, 'hit', location.pathname)
    }
  }, [location.pathname])

  return null
}

export default YandexMetrikaTracker
