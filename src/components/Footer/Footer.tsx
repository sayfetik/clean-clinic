import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { UpListAnimation } from '../../animations'
import { SocialMediaIcons, YandexMap, NavLink, Button, ContactItem, EnrollForm } from '../../components'
import { footer, contacts } from '../../lib/data'
import * as routes from '../../lib/routes'
import Form from '../Form/Form'
import css from './index.module.scss'

const Footer = () => {
  const [isEnrollForm, setIsEnrollForm] = useState(false);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 1024) {
        setIsEnrollForm(true);
      } else {
        setIsEnrollForm(false);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  const [isSmallFooter, setIsSmallFooter] = useState(false);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 768) {
        setIsSmallFooter(true);
      } else {
        setIsSmallFooter(false);
      }
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  return (
    <div className={css.footer}>

      <UpListAnimation>
      <div className={css.root}>
        <div className={css.contacts}>
          <div className={css.mainSection}>
            <div>
              <h2>Контакты</h2>
              <h3 className={css.alias}>@cleanclinic</h3>
            </div>
            {contacts.contactsInfo.map((section, index) => (
              <ContactItem key={index} info={section} />
            ))}
          </div>
          <SocialMediaIcons iconWidth={35} containerWidth="80%" />
        </div>

        <div className={css.maps}>
          <YandexMap />
        </div>

        {!isEnrollForm && <div className={css.form}>
          <Form />
        </div>}
      </div>
      </UpListAnimation>

      {isEnrollForm && <div className={css.page}><EnrollForm /></div>}

      <div className={css.bottom}>
        <div className={css.menuSection}>
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
            <h3 className={css.subscribeTitle}>{footer.promotionsAndOffersTitle}</h3>
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
