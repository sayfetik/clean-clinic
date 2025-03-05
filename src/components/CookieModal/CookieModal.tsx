import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '..'
import css from './index.module.scss'

const CookieModal = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited')
    if (!hasVisited) {
      setIsVisible(true)
      localStorage.setItem('hasVisited', 'true')
    }
  }, [])

  const closeModal = () => {
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className={css.modal}>
      <p>
        Используя данный сайт, я даю своё согласие на использование файлов cookie.
        <Link className={css.link} to="/privacyPolicy" target="_blank">
          {' '}
          Политика конфидециальности
        </Link>
      </p>
      <Button size="small" text="Принять" onClick={closeModal} />
    </div>
  )
}

export default CookieModal
