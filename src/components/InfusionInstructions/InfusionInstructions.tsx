import React from 'react'
import { StepType } from '../../lib/types'
import Step from './Step/Step'
import css from './index.module.scss'

type InfusionInstructionsProps = {
  title: string
  answer: string
  steps: StepType[]
}

const InfusionInstructions: React.FC<InfusionInstructionsProps> = React.memo(({ title, answer, steps }) => {
  const sortedSteps = [...steps].sort((a, b) => Number(a.number) - Number(b.number))
  return (
    <div className={css.root}>
      <h2>{title}</h2>
      <h3 className={css.answer}>{answer}</h3>
      <div className={css.row}>
        {sortedSteps.map((step, index) => (
          <Step key={index} {...step} />
        ))}
      </div>
    </div>
  )
})

export default InfusionInstructions
