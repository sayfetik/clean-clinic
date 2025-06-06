import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '..'
import { DocumentType } from '../../lib/types'
import css from './index.module.scss'

const CookieModal: React.FC<{ privacyPolicy: DocumentType }> = ({ privacyPolicy }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const isCookie = localStorage.getItem('isCookie')
    if (!isCookie) {
      setIsVisible(true)
    }
  }, [])

  const closeModal = () => {
    localStorage.setItem('isCookie', 'true')
    setIsVisible(false)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div className={css.modal}>
      <p>
        Используя данный сайт, я даю своё согласие на использование файлов cookie.
        {typeof privacyPolicy.img === 'string' ? (
          <Link className={css.link} to={privacyPolicy.img} target="_blank">
            {' '}
            Политика конфидециальности
          </Link>
        ) : null}
      </p>
      <Button size="small" text="Принять" onClick={closeModal} />
    </div>
  )
}

export default CookieModal
