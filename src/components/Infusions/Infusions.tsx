import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import linkIcon from '/assets/link.png'
import Animation from '../../animations/Animation'
import { Button } from '../../components'
import { getInfusionRoute } from '../../lib/routes'
import { InfusionType } from '../../lib/types'
import css from './index.module.scss'

const length = 15

const Infusion: React.FC<{infusion: InfusionType, imgWidth: number}> = ({ infusion: {id, name, description, isDescription = true, cost, img}, imgWidth }) => (
  <div className={css.infusionRoot}>
    <img src={img} width={imgWidth} className={css.img}/>
    {isDescription ?
    <Link to={getInfusionRoute({ infusionId: String(id) })}>
      <h3 className={css.name}>{name}</h3>
    </Link>
    :
    <h3 className={css.name}>{name}</h3>
    }
    <p className={css.description}>{description}</p>

    {isDescription &&
      <Link to={getInfusionRoute({ infusionId: String(id) })} className={css.about}>
        <h4>Подробнее</h4>
        <img src={linkIcon} width={length} height={length} />
      </Link>}

    <div className={css.costAndButton}>
      <h3 className={css.cost}>{cost} руб.</h3>
      <Button size="small" />
    </div>
  </div>
)

const Infusions: React.FC<{ items: InfusionType[], imgWidth?: number }> = ({ items, imgWidth = 85 }) => {
  const [animationKey, setAnimationKey] = useState(0)
  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1)
  }, [items])

  return (
    <div className={css.root}>
      {items.map((item, index) => (
        <Animation
          key={`${animationKey}-${index}`}
          distance={50}
          direction="vertical"
          config={{ tension: 95, friction: 20 }}
          initialOpacity={0}
          animateOpacity={false}
          scale={1}
          threshold={0}
          delay={70 * index}
        >
          <Infusion key={index} infusion={item} imgWidth={imgWidth}/>
        </Animation>
      ))}
    </div>
  )
}

export default Infusions
