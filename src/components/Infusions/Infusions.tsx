import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import linkIcon from '/assets/link.png'
import Animation from '../../animations/Animation'
import * as mainPageApi from '../../api/MainAPI'
import { Button } from '../../components'
import { getInfusionRoute } from '../../lib/routes'
import { InfusionCategoryType, InfusionType } from '../../lib/types'
import css from './index.module.scss'

const length = 15

function normalizeInfusion(infusion: any) {
  if ('ivsInfo' in infusion) {
    return {
      id: infusion.infusionId || infusion.id || infusion.ivsInfo.id,
      name: infusion.ivsInfo.name,
      price: infusion.ivsInfo.price,
      imagePath: infusion.ivsInfo.imagePath,
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
    price: infusion.price,
    imagePath: infusion.imagePath,
    duration: infusion.duration,
    description: infusion.description,
    results: infusion.results,
    indications: infusion.indications,
    contraindications: infusion.contraindications || infusion.contradictions,
  }
}

const Infusion: React.FC<{ infusion: InfusionType; imgWidth: number }> = ({ infusion, imgWidth }) => {
  const data = normalizeInfusion(infusion)
  const id = data.id
  const name = data.name
  const description = Array.isArray(data.description) ? data.description.join(', ') : data.description
  const cost = data.price
  const img = data.imagePath
  const isDescription = true
  return (
    <div className={css.infusionRoot}>
      <img src={typeof img === 'string' ? img : URL.createObjectURL(img)} width={imgWidth} className={css.img} />
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
}

const Infusions: React.FC<{ items: InfusionCategoryType[]; imgWidth?: number; category: string }> = ({
  items,
  imgWidth = 85,
  category,
}) => {
  const [animationKey, setAnimationKey] = useState(0)
  useEffect(() => {
    setAnimationKey((prevKey) => prevKey + 1)
  }, [items])

  const [infusions, setInfusions] = useState<InfusionType[]>([])

  useEffect(() => {
    const filterInfusions = async () => {
      if (category === 'Все') {
        const res = await mainPageApi.getAllInfusions()
        setInfusions(res.data)
      } else if (category === 'main') {
        category = 'main' // СДЕЛАТЬ ПОЛУЧЕНИЯ ГЛАВНЫХ КАПЕЛЬНИЦ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      } else {
        for (let i = 0; i < items.length; i++) {
          if (items[i].category === category) {
            setInfusions(items[i].infusions)
          }
        }
      }
    }
    filterInfusions()
  }, [category])

  return (
    <div className={css.root}>
      {infusions.map((item, index) => (
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
}

export default Infusions
