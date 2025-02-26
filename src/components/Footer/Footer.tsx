import { TextInput } from '@mantine/core'
import { IconAt } from '@tabler/icons-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { SocialMediaIcons, YandexMap, NavLink, CheckPolicy, Button } from '../../components'
import { contactsInfo } from '../../lib/data'
import * as routes from '../../lib/routes'
import { ContactInfoType } from '../../lib/types'
import Form from '../Form/Form'
import css from './index.module.scss'

const ContactItem: React.FC<ContactInfoType> = ({ img, title, text }) => {
  const iconSize = 40

  return (
    <div className={css.contactItem}>
      <img src={img} width={iconSize - 5} height={iconSize} />
      <div className={css.contactsInfo}>
        <h3 className={css.contactsTitle}>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  )
}

const Footer = () => {
  const icon = <IconAt size={16} />
  const [checked, setChecked] = useState(false)

  return (
    <div className={css.footer}>
      <div className={css.root}>
        <div className={css.contacts}>
          <div className={css.mainSection}>
            <h2>Контакты</h2>
            {contactsInfo.map((section, index) => (
              <ContactItem key={index} {...section} />
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
            <h3>Акции и предложения</h3>
            <p className={css.subscribeText}>Подписывайтесь на наш телеграм-канал</p>
          </div>
          <TextInput radius="md" leftSectionPointerEvents="none" leftSection={icon} placeholder="Введите алиас" />
          <CheckPolicy {...{ checked, setChecked }} />
          <Button size="small" text="Подписаться" />
        </div>
        <div className={css.companyInfo}>
          <img
            src="https://cleanoren.ru/wp-content/uploads/2024/02/logo1.png"
            alt="Clean Clinic"
            className={css.logo}
          />
          <div>
            <p>ООО "Гармония"</p>
            <p>ИНН/КПП - 5610249037/561001001</p>
            <p>
              Лицензия:{' '}
              <Link to="/license" target="_blank">
                Л041-01022-56/01056435;
              </Link>
            </p>
          </div>
          <Link className={css.link} to="/license" target="_blank">
            Политика конфидециальности
          </Link>
          <Link className={css.link} to="/license" target="_blank">
            Документы
          </Link>
        </div>
      </div>

      <div className={css.end}>
        <p className={css.endText}>© 2011-2025 • Капельницы в Оренбурге, инфузионная терапия.</p>
      </div>
    </div>
  )
}

export default Footer
