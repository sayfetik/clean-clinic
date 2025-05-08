import { WhiteCardType } from '../../lib/types'
import css from './index.module.scss'

const WhiteCard: React.FC<WhiteCardType> = ({ imagePath, title, text }) => (
  <div className={css.card}>
    <img className={css.image} src={typeof imagePath === 'string' ? imagePath : URL.createObjectURL(imagePath)} />
    <div className={css.rightSection}>
      <h3 className={css.title}>{title}</h3>
      <p className={css.text}>{text}</p>
    </div>
  </div>
)

export default WhiteCard
