import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import * as api from '../../api/SuccessErrorAPI'
import { Button } from '../../components'
import { getMainRoute } from '../../lib/routes'
import css from './index.module.scss'

const Error = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({ title: '', text: '' })

  useEffect(() => {
    api.getErrorPage().then(setData)
    document.title = 'Ошибка'
  }, [])

  return (
    <>
      <Helmet>
        <title>Ошибка</title>
        <meta name="description" content="Страница не найдена или произошла ошибка. Попробуйте вернуться на главную страницу Clean Clinic." />
      </Helmet>
      <div className={css.water}>
        <h1 className="blue">{data.title}</h1>
        <h3 className={css.text}>{data.text}</h3>

        <div className={css.buttons}>
          <Button text="На главную" onClick={() => navigate(getMainRoute())} size="small" />
          <Button text="Назад" light={true} onClick={() => navigate(-1)} size="small" />
        </div>
      </div>
    </>
  )
}

export default Error
