import { Menu } from '@mantine/core'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { SocialMediaIcons, NavLink } from '../../components'
import * as routes from '../../lib/routes'
import { ContactsType } from '../../lib/types'
import css from './index.module.scss'

const Logo = () => {
  const getLogoSrc = () =>
    window.matchMedia('(max-width: 455px)').matches
      ? '/assets/smallLogo.png'
      : '/assets/logo.png'

  const [logoSrc, setLogoSrc] = useState(getLogoSrc())

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 455px)')

    const updateLogo = (e: { matches: any }) =>
      setLogoSrc(e.matches ? '/assets/smallLogo.png' : '/assets/logo.png')

    mediaQuery.addEventListener('change', updateLogo)
    return () => mediaQuery.removeEventListener('change', updateLogo)
  }, [])

  return <img src={logoSrc} alt="Clean Clinic" className={css.logo} />
}

const Header: React.FC<{ contacts: ContactsType }> = ({ contacts }) => {
  const phone = contacts.contactsInfo.find((item) => item.title === 'Телефон')?.text ?? ''

  return (
    <div className={css.header}>
      <Logo />
      <div className={css.links}>
        <NavLink text="Главная" to={routes.getMainRoute()} />

        <Menu trigger="click-hover" offset={20} openDelay={30}>
          <Menu.Target>
            <h4 className={css.hoverEffect}>Услуги</h4>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item component="a" href={routes.getInfusionCatalogRoute()}>
              Капельницы
            </Menu.Item>
            <Menu.Item component="a" href={routes.getMassageRoute()}>
              Массаж ICOON
            </Menu.Item>
            <Menu.Item component="a" href={routes.getCryotherapyRoute()}>
              Криотерапия
            </Menu.Item>
            <Menu.Item component="a" href={routes.getPlasmoliftingRoute()}>
              Плазмолифтинг
            </Menu.Item>
            <Menu.Item component="a" href={routes.getAnalyzesgRoute()}>
              Анализы
            </Menu.Item>
            <Menu.Item component="a" href={routes.getSolariumRoute()}>
              Солярий
            </Menu.Item>
            <Menu.Item component="a" href={routes.getHomeVisitRoute()}>
              Выезд на дом
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        <NavLink text="О клинике" to={routes.getAboutRoute()} />
        <NavLink text="Контакты" to={routes.getContactsRoute()} />
        <Link to={contacts.socialMediaLinks.location} className={css.location}>
          {contacts.smallAddress}
        </Link>
        <div className={css.hours}>{contacts.workHours}</div>
        <Link to={contacts.socialMediaLinks['phone']} className={css.phone}>
          {phone}
        </Link>
      </div>
      <div className={css.socIcons}>
        <SocialMediaIcons contacts={contacts}/>
      </div>
    </div>
  )
}

export default Header
