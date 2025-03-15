import { main } from '../../lib/data'
import Step from './Step/Step'
import css from './index.module.scss'

const InfusionInstructions = () => (
  <div className={css.root}>
    <h2>{main.infusionInstructions.title}</h2>
    <h3 className={css.answer}>{main.infusionInstructions.answer}</h3>
    <div className={css.row}>
      {main.infusionInstructions.steps.map((step, index) => (
        <Step key={index} {...step} />
      ))}
    </div>
  </div>
)

export default InfusionInstructions
