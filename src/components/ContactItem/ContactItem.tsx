import { contacts } from '../../lib/data'
import css from './index.module.scss'

type ContactInfoType = {
  img: string
  title: string
  text: string
}

const linkLabels = {
  'Телефон': 'phone',
  'Адрес': 'location',
  'Почта': 'email'
} as const

const ContactItem: React.FC<{ info: ContactInfoType }> = ({ info }) => {
  const iconSize = 40

  const contactKey = linkLabels[info.title as keyof typeof linkLabels] ?? null
  const link = contactKey ? contacts.socialMediaLinks[contactKey] ?? '#' : '#'

  const isExternal = contactKey === 'location'

  return (
    <a href={link} className={css.item} target={isExternal ? "_blank" : "_self"} rel="noopener noreferrer">
      <img src={info.img} width={iconSize - 5} height={iconSize} alt={info.title} />
      <div className={css.info}>
        <h3 className={css.title}>{info.title}</h3>
        <p className={css.text}>{info.text}</p>
      </div>
    </a>
  )
}

export default ContactItem
