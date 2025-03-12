import email from '/assets/email.png'
import telegram from '/assets/telegram.png'
import vk from '/assets/vk.png'
import whatsup from '/assets/whatsup.png'
import css from './index.module.scss'
import { openOnBlankPage } from '../../lib/routes'
import { contacts } from '../../lib/data'

type SocialMediaIconsProps = {
  iconWidth?: number
  containerWidth?: string
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ iconWidth = 28, containerWidth = 'fit-content' }) => {
  const handleIconClick = (platform: 'telegram' | 'email' | 'vkontakte' | 'whatsup') => openOnBlankPage(contacts.socialMediaLinks[platform])
  
  return (
    <div className={css.socialMediaIcons} style={{ width: containerWidth }}>
      <img
        src={telegram}
        width={iconWidth}
        alt="telegram"
        className={css.icon}
        onClick={() => handleIconClick('telegram')}
      />
      <img
        src={whatsup}
        width={iconWidth}
        alt="whatsup"
        className={css.icon}
        onClick={() => handleIconClick('whatsup')}
      />
      <img
        src={vk}
        width={iconWidth}
        alt="vk"
        className={css.icon}
        onClick={() => handleIconClick('vkontakte')}
      />
      <img
        src={email}
        width={iconWidth}
        alt="email"
        className={css.icon}
        onClick={() => handleIconClick('email')}
      />
    </div>
  )
}

export default SocialMediaIcons
