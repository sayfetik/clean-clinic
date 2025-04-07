import { Button } from '@mantine/core'
import { useAuth } from '../../../context/AuthContext'
import css from './index.module.scss'

const HeaderAdmin = () => {
  const { logout } = useAuth()

  return (
    <div className={css.header}>
      <img src="https://cleanoren.ru/wp-content/uploads/2024/02/logo1.png" alt="Clean Clinic" className={css.logo} />
      <div className={css.row}>
        <h4>Администратор</h4>
        <Button color="blue" onClick={logout} variant="outline">
          Выход
        </Button>
      </div>
    </div>
  )
}

export default HeaderAdmin
