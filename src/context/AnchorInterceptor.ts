import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const AnchorInterceptor = () => {
  const navigate = useNavigate()

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (target.tagName === 'A') {
        const anchor = target as HTMLAnchorElement
        const href = anchor.getAttribute('href')
        // Проверяем, что ссылка ведёт внутри сайта (начинается с '/')
        if (href && href.startsWith('/')) {
          e.preventDefault()
          navigate(href)
        }
      }
    }

    document.addEventListener('click', onClick)
    return () => {
      document.removeEventListener('click', onClick)
    }
  }, [navigate])

  return null
}
