import css from './index.module.scss'

const GradientText: React.FC<{ text: string }> = ({ text }) => (
  <div className={css.containerStyle}>
    <h2 className="blue">{text}</h2>
  </div>
)

export default GradientText
