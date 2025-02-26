import { Link } from 'react-router-dom'
import { GradientText } from '../../components'
import { mainInfusions } from '../../lib/data'
import { getInfusionRoute } from '../../lib/routes'
import css from './index.module.scss'

const InfusionCatalog = () => {
  return (
    <div className={css.root}>
      {mainInfusions.map((infusion) => (
        <Link key={infusion.id} className={css.link} to={getInfusionRoute({ infusionId: String(infusion.id) })}>
          {infusion.name}
        </Link>
      ))}
    </div>
  )
}

export default InfusionCatalog
