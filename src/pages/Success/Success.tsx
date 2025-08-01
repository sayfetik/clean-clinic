import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'
import * as api from '../../api/SuccessErrorAPI'
import { Button } from '../../components'
import { getMainRoute } from '../../lib/routes'
import css from './index.module.scss'

const Success = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({ title: '', text: '' })

  useEffect(() => {
    api.getSuccessPage().then(setData)
    document.title = 'Запись успешно сделана!'
  }, [])

  return (
    <>
      <Helmet>
        <title>Запись успешно сделана!</title>
        <meta name="description" content="Успешная запись Клин Клиник" />
        <meta
          name="description"
          content="Ваша запись успешно принята! Клин Клиник — клиника инфузионной терапии в Оренбурге."
        />
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

export default Success
