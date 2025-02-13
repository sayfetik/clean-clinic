import { Link } from 'react-router-dom'
import { infusions } from '../../lib/data'
import { getInfusionRoute } from '../../lib/routes'

const InfusionCatalog = () => {
  return (
    <div>
      Infusion catalog
      {infusions.map((infusion) => (
        <div key={infusion.id}>
          <Link to={getInfusionRoute({ infusionId: String(infusion.id) })}>{infusion.name}</Link>
        </div>
      ))}
    </div>
  )
}

export default InfusionCatalog
