import { infusionInsructions } from '../../lib/data'
import Step from './Step/Step'
import css from './index.module.scss'

const InfusionInstructions = () => (
  <div className={css.root}>
    <h2>Как пройти курс капельниц?</h2>
    <div className={css.answer}>Всё очень просто!</div>
    <div className={css.row}>
      {infusionInsructions.map((step, index) => (
        <Step key={index} {...step} />
      ))}
    </div>
  </div>
)

export default InfusionInstructions
