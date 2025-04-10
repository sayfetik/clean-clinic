import { Helmet } from "react-helmet-async"
import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import { ErrorPage } from '../../lib/data'
import { getMainRoute } from '../../lib/routes'
import css from './index.module.scss'

const Error = () => {
  const navigate = useNavigate()

  return (
    <>
      <Helmet>
        <title>Ошибка</title>
        <meta name="description" content="Ошибка" />
      </Helmet>
      <div className={css.water}>
        <h1 className="blue">{ErrorPage.title}</h1>
        <h3 className={css.text}>{ErrorPage.text}</h3>

        <div className={css.buttons}>
          <Button text="На главную" onClick={() => navigate(getMainRoute())} size="small" />
          <Button text="Назад" light={true} onClick={() => navigate(-1)} size="small" />
        </div>
      </div>
    </>
  )
}

export default Error
