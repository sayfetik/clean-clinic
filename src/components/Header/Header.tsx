import { Menu } from '@mantine/core'
import { Link } from 'react-router-dom'
import { SocialMediaIcons, NavLink } from '../../components'
import { headerData } from '../../lib/data'
import * as routes from '../../lib/routes'
import css from './index.module.scss'

const Header = () => (
  <div className={css.header}>
    <img src="https://cleanoren.ru/wp-content/uploads/2024/02/logo1.png" alt="Clean Clinic" className={css.logo} />
    <div className={css.links}>
      <NavLink text="Главная" to={routes.getMainRoute()} />

      <Menu trigger="click-hover" offset={20} openDelay={100}>
        <Menu.Target>
          <h4>Услуги</h4>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item component="a" href={routes.getInfusionCatalogRoute()}>
            Капельницы
          </Menu.Item>
          <Menu.Item component="a" href={routes.getInfusionCatalogRoute()}>
            Криокапсула
          </Menu.Item>
          <Menu.Item component="a" href="https://mantine.dev">
            Массаж
          </Menu.Item>
          <Menu.Item component="a" href="https://mantine.dev">
            Плазмолифтинг
          </Menu.Item>
          <Menu.Item component="a" href="https://mantine.dev">
            Солярий с Collaten лампами
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <NavLink text="О клинике" to={routes.getAboutRoute()} />
      <NavLink text="Контакты" to={routes.getContactsRoute()} />
      <Link to={headerData.locationLink} className={css.location}>
        {headerData.location}
      </Link>
      <div className={css.hours}>{headerData.workHours}</div>
      <div className={css.link}>{headerData.phoneNumber}</div>
    </div>
    <SocialMediaIcons />
  </div>
)

export default Header
