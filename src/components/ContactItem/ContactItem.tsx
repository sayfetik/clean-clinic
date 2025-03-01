import { getLocationRoute } from '../../lib/routes'
import { ContactInfoType } from '../../lib/types'
import css from './index.module.scss'

const ContactItem: React.FC<ContactInfoType> = ({ img, title, text, link }) => {
  const iconSize = 40

  return (
    <a href={link} className={css.item} target={link === getLocationRoute() ? "_blank" : '_self'} rel="noopener noreferrer">
      <img src={img} width={iconSize - 5} height={iconSize} />
      <div className={css.info}>
        <h3 className={css.title}>{title}</h3>
        <p className={css.text}>{text}</p>
      </div>
    </a>
  )
}

export default ContactItem
