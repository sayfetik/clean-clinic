import css from './index.module.scss'
import NavLink from './NavLink/NavLink'
import { Link } from 'react-router-dom'
import * as routes from '../../lib/routes'
import SocialMediaIcons from '../SocialMediaIcons/SocialMediaIcons'
import * as data from '../../lib/data'

const Header = () => {
  return (
    <div className={css.header}>
      <img src='https://cleanoren.ru/wp-content/uploads/2024/02/logo1.png' alt="Clean Clinic" className={css.logo} />
      <div className={css.links}>
        <NavLink text="Главная" to={routes.getMainRoute()} />
        <NavLink text="Услуги" to={routes.getServicesRoute()} />
        <NavLink text="О клинике" to={routes.getAboutRoute()} />
        <NavLink text="Контакты" to={routes.getContactsRoute()} />
        <Link to={data.locationLink} className={css.location}>{data.location}</Link>
        <p className={css.hours}>{data.workHours}</p>
        <div className={css.link}>{data.phoneNumber}</div>
      </div>
      <SocialMediaIcons />
    </div>
  )
}

export default Header
