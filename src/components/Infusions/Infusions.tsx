import { Link } from 'react-router-dom'
import linkIcon from '/assets/link.png'
import { Button } from '../../components'
import { getInfusionRoute } from '../../lib/routes'
import { InfusionType } from '../../lib/types'
import css from './index.module.scss'

const length = 15

const Infusion: React.FC<InfusionType> = ({ id, name, description, cost, img }) => (
  <div className={css.infusionRoot}>
    <img src={img} width={80} />
    <Link to={getInfusionRoute({ infusionId: String(id) })}>
      <h3 className={css.name}>{name}</h3>
    </Link>
    <p className={css.description}>{description}</p>

    <Link to={getInfusionRoute({ infusionId: String(id) })} className={css.about}>
      <h4>Подробнее</h4>
      <img src={linkIcon} width={length} height={length} />
    </Link>

    <div className={css.costAndButton}>
      <h3 className={css.cost}>{cost} руб.</h3>
      <Button size="small" />
    </div>
  </div>
)

const Infusions: React.FC<{ items: InfusionType[] }> = ({ items }) => (
  <div className={css.root}>
    {items.map((item, index) => (
      <Infusion key={index} {...item} />
    ))}
  </div>
)

export default Infusions
