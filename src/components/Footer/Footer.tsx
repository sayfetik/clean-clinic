import { useState, useEffect } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import { UpListAnimation } from '../../animations'
import { getFooter } from '../../api/FooterAPI'
import { SocialMediaIcons, YandexMap, NavLink, Button, ContactItem, EnrollForm, Form } from '../../components'
import { emptyFooter } from '../../lib/empty'
import * as routes from '../../lib/routes'
import { ContactsType, DocumentType } from '../../lib/types'
import css from './index.module.scss'

const Footer: React.FC<{ title: string; contacts: ContactsType; license: DocumentType; privacyPolicy: DocumentType }> =
  React.memo(({ title, contacts, license, privacyPolicy }) => {
    const [isEnrollForm, setIsEnrollForm] = useState(false)
    const [footer, setFooter] = useState<any>(emptyFooter)

    useEffect(() => {
      getFooter().then(setFooter)
      const updateSlidesToShow = () => {
        if (window.innerWidth <= 1024) {
          setIsEnrollForm(true)
        } else {
          setIsEnrollForm(false)
        }
      }

      updateSlidesToShow()
      window.addEventListener('resize', updateSlidesToShow)
      return () => window.removeEventListener('resize', updateSlidesToShow)
    }, [])

    const handleOpen = (img: string | File) => {
      if (!img) {
        return
      }
      if (typeof img === 'string') {
        window.open(img, '_blank')
      } else if (img instanceof File) {
        const url = URL.createObjectURL(img)
        window.open(url, '_blank')
        setTimeout(() => URL.revokeObjectURL(url), 10000)
      }
    }

    return (
      <div className={css.footer}>
        <UpListAnimation>
          <div className={css.root}>
            <div className={css.contacts}>
              <div className={css.mainSection}>
                <div>
                  <h2>Контакты</h2>
                  <h3 className={css.alias}>@clean_clinic_orb</h3>
                </div>
                {contacts.contactsInfo.map((section, index) => (
                  <ContactItem key={index} info={section} contacts={contacts} />
                ))}
              </div>
              <SocialMediaIcons iconWidth={35} containerWidth="100px" contacts={contacts} />
            </div>

            <div className={css.maps}>
              <YandexMap />
            </div>

            {!isEnrollForm && (
              <div className={css.form}>
                <Form />
              </div>
            )}
          </div>
        </UpListAnimation>

        {isEnrollForm && (
          <div className={css.page}>
            <EnrollForm title={title} />
          </div>
        )}

        <div className={css.bottom}>
          <div className={css.menuSection}>
            <h3 className={css.menuTitle}>Меню</h3>
            <div className={css.menu}>
              <NavLink text="Главная" to={routes.getMainRoute()} />
              <h4>Услуги</h4>
              <div className={css.servicesMenu}>
                <NavLink text="Капельницы" to={routes.getInfusionCatalogRoute()} />
                <NavLink text="Массаж ICOON" to={routes.getMassageRoute()} />
                <NavLink text="Криотерапия" to={routes.getCryotherapyRoute()} />
                <NavLink text="Плазмолифтинг" to={routes.getPlasmoliftingRoute()} />
                <NavLink text="Анализы" to={routes.getAnalyzesgRoute()} />
                <NavLink text="Солярий" to={routes.getSolariumRoute()} />
                <NavLink text="Выезд на дом" to={routes.getHomeVisitRoute()} />
              </div>
              <NavLink text="О клинике" to={routes.getAboutRoute()} />
              <NavLink text="Контакты" to={routes.getContactsRoute()} />
            </div>
          </div>

          <div className={css.subscribe}>
            <div>
              <h3 className={css.subscribeTitle}>{footer.promotionsAndOffersTitle}</h3>
              <p className={css.subscribeText}>{footer.promotionsAndOffersText}</p>
            </div>
            <Button
              size="small"
              text="Подписаться"
              onClick={() => window.open(contacts.socialMediaLinks.telegram, '_blank')}
            />
          </div>

          <div className={css.companyInfo}>
            <img
              src="https://cleanoren.ru/wp-content/uploads/2024/02/logo1.png"
              alt="Clean Clinic"
              className={css.logo}
            />
            <div>
              <p>{footer.ooo}</p>
              <p>{footer.inn}</p>
              <p>
                Лицензия:
                <button onClick={() => handleOpen(license.img)} className={css.none}>
                  <p className={css.blue}>{footer.licenseNo}</p>
                </button>
              </p>
            </div>
            {typeof privacyPolicy.img === 'string' ? (
              <Link className={css.link} to={privacyPolicy.img} target="_blank">
                {' '}
                Политика конфидециальности
              </Link>
            ) : null}
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
  })

export default Footer
