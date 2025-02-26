import { WhiteCardType } from '../../lib/types'
import css from './index.module.scss'

const WhiteCard: React.FC<WhiteCardType> = ({ img, title, text }) => (
  <div className={css.card}>
    <img width="60" src={img} />
    <h3 className={css.title}>{title}</h3>
    <p>{text}</p>
  </div>
)

export default WhiteCard
