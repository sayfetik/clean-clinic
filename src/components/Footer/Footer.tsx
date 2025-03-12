import { Link } from 'react-router-dom'
import { SocialMediaIcons, YandexMap, NavLink, Button, ContactItem } from '../../components'
import { footer, contacts } from '../../lib/data'
import * as routes from '../../lib/routes'
import Form from '../Form/Form'
import css from './index.module.scss'

const Footer = () => {

  return (
    <div className={css.footer}>
      <div className={css.root}>
        <div className={css.contacts}>
          <div className={css.mainSection}>
            <h2 className="blue">Контакты</h2>
            {contacts.contactsInfo.map((section, index) => (
              <ContactItem key={index} info={section} />
            ))}
          </div>
          <SocialMediaIcons iconWidth={35} containerWidth="80%" />
        </div>

        <div className={css.maps}>
          <YandexMap />
        </div>

        <div className={css.form}>
          <Form />
        </div>
      </div>

      <div className={css.bottom}>
        <div>
          <h3 className={css.menuTitle}>Меню</h3>
          <div className={css.menu}>
            <NavLink text="Главная" to={routes.getMainRoute()} />
            <NavLink text="Капельницы" to={routes.getInfusionCatalogRoute()} />
            <NavLink text="Массаж" to={routes.getInfusionCatalogRoute()} />
            <NavLink text="О клинике" to={routes.getAboutRoute()} />
            <NavLink text="Контакты" to={routes.getContactsRoute()} />
          </div>
        </div>

        <div className={css.subscribe}>
          <div>
            <h3>{footer.promotionsAndOffersTitle}</h3>
            <p className={css.subscribeText}>{footer.promotionsAndOffersText}</p>
          </div>
          <Button size="small" text="Подписаться" /* onClick={ функция подписки на рассылку} */ />
        </div>
        <div className={css.companyInfo}>
          <img
            src="https://cleanoren.ru/wp-content/uploads/2024/02/logo1.png"
            alt="Clean Clinic"
            className={css.logo}
          />
          <div>
            <p>{footer.ooo}</p>
            <Link to={routes.getLicenseRoute()}>
              <p>{footer.inn}</p>
            </Link>
            <p>
              Лицензия:{' '}
              <Link to="/license" target="_blank">
                {footer.licenseNo}
              </Link>
            </p>
          </div>
          <Link className={css.link} to="/privacyPolicy" target="_blank">
            Политика конфидециальности
          </Link>
          <Link className={css.link} to="/documents">
            Документы
          </Link>
        </div>
      </div>

      <div className={css.end}>
        <p className={css.endText}>{footer.bootomSection}</p>
      </div>
    </div>
  )
}

export default Footer
