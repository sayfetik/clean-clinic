import email from '/assets/email.png'
import telegram from '/assets/telegram.png'
import vk from '/assets/vk.png'
import whatsup from '/assets/whatsup.png'
import css from './index.module.scss'

type SocialMediaIconsProps = {
  iconWidth?: number
  containerWidth?: string
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ iconWidth = 28, containerWidth = 'fit-content' }) => (
  <div className={css.socialMediaIcons} style={{ width: containerWidth }}>
    <img src={telegram} width={iconWidth} alt="telegram" className={css.icon} />
    <img src={whatsup} width={iconWidth} alt="whatsup" className={css.icon} />
    <img src={vk} width={iconWidth} alt="vk" className={css.icon} />
    <img src={email} width={iconWidth} alt="email" className={css.icon} />
  </div>
)

export default SocialMediaIcons
