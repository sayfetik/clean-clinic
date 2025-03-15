import { AdvantageType } from '../../lib/types'
import css from './index.module.scss'

const Advantage: React.FC<AdvantageType> = ({ title, text }) => (
  <div className={css.root}>
    <h3 className={css.title}>{title}</h3>
    <p className={css.text}>{text}</p>
  </div>
)

export default Advantage
