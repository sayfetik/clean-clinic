import { useParams } from 'react-router-dom'
import { infusions } from '../../lib/data'
import { InfusionRouteParamsType } from '../../lib/routes'

const Infusion = () => {
  const { infusionId } = useParams() as InfusionRouteParamsType
  const infusion = infusions[Number(infusionId) - 1]

  if (!infusion) {
    return <div>Инфузия не найдена</div>
  }

  return <div>{infusion.name}</div>
}

export default Infusion
