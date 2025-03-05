import { useNavigate } from 'react-router-dom'
import { Button } from '../../components'
import { getMainRoute } from '../../lib/routes'
import css from './index.module.scss'

const Success = () => {
  const navigate = useNavigate()

  return (
    <div className={css.water}>
      <h1 className="blue">Ошибка</h1>
      <h3 className={css.text}>Что-то пошло не так...</h3>

      <div className={css.buttons}>
        <Button text="На главную" onClick={() => navigate(getMainRoute())} size="small" />
        <Button text="Назад" light={true} onClick={() => navigate(-1)} size="small" />
      </div>
    </div>
  )
}

export default Success
