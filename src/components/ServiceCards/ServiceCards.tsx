import { useEffect, useState } from 'react'
import { Button } from '..'
import Animation from '../../animations/Animation'
import { AnalyzesServiceType } from '../../lib/types'
import css from '../Infusions/index.module.scss'

const Card: React.FC<AnalyzesServiceType> = ({ name, bullets, cost, img }) => (
  <div className={css.infusionRoot}>
    <img src={typeof img === 'string' ? img : URL.createObjectURL(img)} width={150} className={css.img} />
    <h3 className={css.name}>{name}</h3>
    <ul className={css.bulletList}>
      {bullets &&
        bullets.map((bullet, index) => (
          <li className={css.bullet} key={index}>
            {bullet}
          </li>
        ))}
    </ul>

    <div className={css.costAndButton}>
      <h3 className={css.cost}>{cost} руб.</h3>
      <Button size="small" />
    </div>
  </div>
)

const ServiceCards: React.FC<{ items: AnalyzesServiceType[] }> = ({ items }) => {
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
          <Card key={index} {...item} />
        </Animation>
      ))}
    </div>
  )
}

export default ServiceCards
