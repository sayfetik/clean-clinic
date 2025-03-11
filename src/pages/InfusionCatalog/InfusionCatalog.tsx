import { useState } from 'react'
import { UpAnimation } from '../../animations'
import { Filters, GradientText, Infusions } from '../../components'
import { infusionCatalog } from '../../lib/data'
import css from './index.module.scss'

const InfusionCatalog = () => {
  const [chosenId, setChosenId] = useState(0)
  const filterKeys = Object.keys(infusionCatalog.infusions);
  const filterKey = filterKeys[chosenId] || filterKeys[0];

  return (
    <>
      <GradientText text={infusionCatalog.title} />
      <div className={css.root}>
        <UpAnimation>
          <div className={css.filters}>
            <Filters filters={filterKeys} chosenOption={{ chosenId, setChosenId }} />
          </div>
        </UpAnimation>
        <Infusions items={infusionCatalog.infusions[filterKey] || []} />
      </div>
    </>
  )
}

export default InfusionCatalog
