import email from '/assets/email.png'
// import telegram from '/assets/telegram.png'
import vk from '/assets/vk.png'
// import whatsup from '/assets/whatsup.png'
import css from './index.module.scss'
import { openOnBlankPage } from '../../lib/routes'
import { useState, useEffect } from 'react'
import { ContactsType } from '../../lib/types'

type SocialMediaIconsProps = {
  iconWidth?: number
  containerWidth?: string
  contacts: ContactsType
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({
  iconWidth = 28,
  containerWidth = 'fit-content',
  contacts,
}) => {
  const handleIconClick = (platform: 'telegram' | 'email' | 'vkontakte' | 'whatsup') =>
    openOnBlankPage(contacts.socialMediaLinks[platform])

  const [width, setWidth] = useState(iconWidth)

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 1280) {
        setWidth(iconWidth - 3)
      } else if (window.innerWidth <= 1024) {
        setWidth(iconWidth - 7)
      } else if (window.innerWidth <= 768) {
        setWidth(iconWidth - 10)
      }
    }

    updateSlidesToShow()
    window.addEventListener('resize', updateSlidesToShow)
    return () => window.removeEventListener('resize', updateSlidesToShow)
  }, [])

  return (
    <div className={css.socialMediaIcons} style={{ width: containerWidth }}>
      {/* <img
        src={telegram}
        width={width}
        alt="telegram"
        className={css.icon}
        onClick={() => handleIconClick('telegram')}
      />
      <img src={whatsup} width={width} alt="whatsup" className={css.icon} onClick={() => handleIconClick('whatsup')} /> */}
      <img src={vk} width={width} alt="vk" className={css.icon} onClick={() => handleIconClick('vkontakte')} />
      <img src={email} width={width} alt="email" className={css.icon} onClick={() => handleIconClick('email')} />
    </div>
  )
}

export default SocialMediaIcons
