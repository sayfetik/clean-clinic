import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollResetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()

  useEffect(() => {
    // Сбрасываем скролл при каждом изменении маршрута
    window.scrollTo(0, 0)
  }, [location]) // Зависимость от location, чтобы срабатывать при изменении маршрута

  return <>{children}</>
}

export default ScrollResetProvider
