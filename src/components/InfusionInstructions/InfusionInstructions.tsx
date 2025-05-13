import React from 'react'
import { StepType } from '../../lib/types'
import Step from './Step/Step'
import css from './index.module.scss'

type InfusionInstructionsProps = {
  title: string
  answer: string
  steps: StepType[]
}

const InfusionInstructions: React.FC<InfusionInstructionsProps> = React.memo(({ title, answer, steps }) => (
  <div className={css.root}>
    <h2>{title}</h2>
    <h3 className={css.answer}>{answer}</h3>
    <div className={css.row}>
      {steps.map((step, index) => (
        <Step key={index} {...step} />
      ))}
    </div>
  </div>
))

export default InfusionInstructions
