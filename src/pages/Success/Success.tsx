import { Helmet } from "react-helmet-async"
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import { SuccessPage } from '../../lib/data'
import { getMainRoute } from '../../lib/routes'
import css from './index.module.scss'

const Success = () => {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Запись успешно сделана!</title>
        <meta name="description" content="Успешная запись Clean Clinic" />
        <meta name="keywords" content="Запись, капельницы, здоровье, красота, Clean Clinic" />
      </Helmet>
      <div className={css.water}>
        <h1 className="blue">{SuccessPage.title}</h1>
        <h3 className={css.text}>{SuccessPage.text}</h3>

        <div className={css.buttons}>
          <Button text="На главную" onClick={() => navigate(getMainRoute())} size="small" />
          <Button text="Назад" light={true} onClick={() => navigate(-1)} size="small" />
        </div>
      </div>
    </>
  )
}

export default Success
