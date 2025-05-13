import { useEffect, useState } from 'react'
import React from 'react'
import { Link } from 'react-router-dom'
import linkIcon from '/assets/link.png'
import Animation from '../../animations/Animation'
import { Button } from '../../components'
import { getInfusionRoute } from '../../lib/routes'
import { PlasmoliftingServiceType } from '../../lib/types'
import css from './index.module.scss'

const length = 15

function normalizeInfusion(infusion: any) {
  if ('ivsInfo' in infusion) {
    return {
      id: infusion.infusionId || infusion.id || infusion.ivsInfo.id,
      name: infusion.ivsInfo.name,
      price: infusion.ivsInfo.cost,
      img: infusion.ivsInfo.img,
      duration: infusion.ivsInfo.duration,
      description: infusion.ivsInfo.description,
      results: infusion.ivsInfo.results,
      indications: infusion.ivsInfo.indications,
      contraindications: infusion.ivsInfo.contraindications || infusion.ivsInfo.contradictions,
    }
  }
  return {
    id: infusion.id,
    name: infusion.name,
    price: infusion.cost,
    img: infusion.img,
    duration: infusion.duration,
    description: infusion.description,
    results: infusion.results,
    indications: infusion.indications,
    contraindications: infusion.contraindications || infusion.contradictions,
  }
}


const Infusion: React.FC<{ infusion: PlasmoliftingServiceType; imgWidth: number }> = React.memo(({ infusion, imgWidth }) => {
  const data = normalizeInfusion(infusion)
  const id = data.id
  const name = data.name
  const description = Array.isArray(data.description) ? data.description[0] : data.description
  const cost = data.price
  const img = data.img
  const isDescription = true

  let imgSrc = ''
  if (typeof img === 'string') {
    imgSrc = img
  } else if (img instanceof File || img instanceof Blob) {
    imgSrc = URL.createObjectURL(img)
  }

  return (
    <div className={css.infusionRoot}>
      <img src={imgSrc} width={imgWidth} className={css.img} />
      {isDescription ? (
        <Link to={getInfusionRoute({ infusionId: String(id) })}>
          <h3 className={css.name}>{name}</h3>
        </Link>
      ) : (
        <h3 className={css.name}>{name}</h3>
      )}
      <p className={css.description}>{description}</p>

      {isDescription && (
        <Link to={getInfusionRoute({ infusionId: String(id) })} className={css.about}>
          <h4>Подробнее</h4>
          <img src={linkIcon} width={length} height={length} />
        </Link>
      )}

      <div className={css.costAndButton}>
        <h3 className={css.cost}>{cost} руб.</h3>
        <Button size="small" />
      </div>
    </div>
  )
})

const PlasmoLiftings: React.FC<{ items: PlasmoliftingServiceType[]; imgWidth?: number }> = React.memo(({
  items,
  imgWidth = 85,
}) => {
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
          <Infusion key={index} infusion={item} imgWidth={imgWidth} />
        </Animation>
      ))}
    </div>
  )
})

export default PlasmoLiftings
