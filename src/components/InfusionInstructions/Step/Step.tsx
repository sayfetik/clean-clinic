import { StepType } from '../../../lib/types'
import css from './index.module.scss'

const Step: React.FC<StepType> = ({ number, title, text }) => (
  <div className={css.root}>
    <h1 className="blue">{number}</h1>
    <div className={css.textContent}>
      <h3 className={css.title}>{title}</h3>
      <p>{text}</p>
    </div>
  </div>
)

export default Step
