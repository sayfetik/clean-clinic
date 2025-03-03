import { useParams } from 'react-router-dom'
import { GradientText } from '../../components'
import { main } from '../../lib/data'
import { InfusionRouteParamsType } from '../../lib/routes'
import css from './index.module.scss'

const Infusion = () => {
  const { infusionId } = useParams() as InfusionRouteParamsType
  const infusion = main.infusions.infusions[Number(infusionId) - 1]

  if (!infusion) {
    return <div>Инфузия не найдена</div>
  }

  return (
    <div>
      <GradientText text='' />
      <div className={css.root}>
        <p>{infusion.description}</p>
      </div>
    </div>
  )
}

export default Infusion
