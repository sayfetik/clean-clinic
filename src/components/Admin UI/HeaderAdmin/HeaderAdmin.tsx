import { Button } from '@mantine/core'
import { useAuth } from '../../../context/AuthContext'
import css from './index.module.scss'

const HeaderAdmin = () => {
  const { logout } = useAuth()

  return (
    <div className={css.header}>
      <img src="/assets/logo.png" alt="Клин Клиник" className={css.logo} />
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
