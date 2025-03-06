// import { useParams } from 'react-router-dom'
import { UpAnimation } from '../../animations'
import { Button, InfusionInstructions } from '../../components'
import { InfusionPage /*main*/ } from '../../lib/data'
// import { InfusionRouteParamsType } from '../../lib/routes'
import clock from '/assets/clock.png'
import css from './index.module.scss'

const Infusion = () => {
  // const { infusionId } = useParams() as InfusionRouteParamsType
  // const infusion = main.infusions.infusions[Number(infusionId) - 1]

  const infusion = InfusionPage
  if (!infusion) {
    return <div>Инфузия не найдена</div>
  }

  return (
    <div>
      <div className={css.upperSection}>
        <div className={css.upperSetionContent}>
          <UpAnimation>
            <img src={infusion.img} width={120} className={css.image} />
            <div className={css.upperSetionText}>
              <h2 className={css.name}>{infusion.name}</h2>

              <div className={css.upperInfo}>
                <h3>{infusion.cost} руб.</h3>
                <div className={css.duration}>
                  <img src={clock} width={20} />
                  <h4>{infusion.duration}</h4>
                </div>
              </div>

              <Button size="small" />
            </div>
          </UpAnimation>
        </div>
      </div>
      <div className={css.root}>
        <div className={css.description}>
          <ul className={css.bulletList}>
            {infusion.description.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className={css.sideBlock}>
          <div className={css.list}>
            <h3>Результаты</h3>
            <ul className={css.greenArrowList}>
              {infusion.results.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={css.list}>
            <h3>Показания к применению</h3>
            <ul className={css.blueArrowList}>
              {infusion.indications.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={css.list}>
            <h3>Противопоказания</h3>
            <ul className={css.redArrowList}>
              {infusion.contraindications.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className={css.infusionInstructions}>
        <InfusionInstructions />
      </div>
    </div>
  )
}

export default Infusion
