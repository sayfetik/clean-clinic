import { UpAnimation } from '../../animations'
import css from './index.module.scss'

const GradientText: React.FC<{ text: string }> = ({ text }) => (
    <div className={css.containerStyle}>
      <UpAnimation><h1 className="blue">{text}</h1></UpAnimation>
    </div>
)

export default GradientText
