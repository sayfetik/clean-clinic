import { useParams } from 'react-router-dom'
import { UpAnimation } from '../../animations'
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
      <div className={css.upperSection}>
        <UpAnimation><h1 className="blue">{infusion.name}</h1></UpAnimation>
      </div>
      <div className={css.root}>
        <p>{infusion.description}</p>
      </div>
    </div>
  )
}

export default Infusion
