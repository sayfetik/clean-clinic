import { useState } from 'react'
import { UpAnimation } from '../../animations'
import { Filters, GradientText, Infusions } from '../../components'
import { filters, infusions } from '../../lib/data'
import css from './index.module.scss'

const InfusionCatalog = () => {
  const [chosenId, setChosenId] = useState(0)

  return (
    <>
      <GradientText text="Капельницы" />
      <div className={css.root}>
        <UpAnimation>
          <div className={css.filters}>
            <Filters filters={filters} chosenOption={{ chosenId, setChosenId }} />
          </div>
        </UpAnimation>
          <Infusions items={infusions[filters[chosenId]]} />
      </div>
    </>
  )
}

export default InfusionCatalog
