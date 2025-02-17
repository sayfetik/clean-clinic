import css from './index.module.scss'
import telegram from '../../assets/telegram.png'
import whatsup from '../../assets/whatsup.png'
import vk from '../../assets/vk.png'
import email from '../../assets/email.png'

interface SocialMediaIconsProps {
  iconWidth?: number
  containerWidth?: string
}
const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ iconWidth = 30, containerWidth = '250px' }) => (
  <div className={css.socialMediaIcons} style={{ width: containerWidth }}>
    <img src={telegram} width={iconWidth} alt="telegram" className={css.icon} />
    <img src={whatsup} width={iconWidth} alt="whatsup" className={css.icon} />
    <img src={vk} width={iconWidth} alt="vk" className={css.icon} />
    <img src={email} width={iconWidth} alt="email" className={css.icon} />
  </div>
)

export default SocialMediaIcons
