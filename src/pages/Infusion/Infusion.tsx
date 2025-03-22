// import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Helmet } from "react-helmet-async"
import { UpAnimation } from '../../animations'
import { Button, InfusionInstructions } from '../../components'
import { InfusionPage /*main*/ } from '../../lib/data'
// import { InfusionRouteParamsType } from '../../lib/routes'
import clock from '/assets/clock.png'
import css from './index.module.scss'

const Infusion = () => {
  // const { infusionId } = useParams() as InfusionRouteParamsType
  // const infusion = main.infusions.infusions[Number(infusionId) - 1]

  const [width, setWidth] = useState(20)

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 768) {
        setWidth(18)
      } else if (window.innerWidth <= 450) {
        setWidth(16)
      } else {
        setWidth(20)
      }
    }

    updateSlidesToShow()
    window.addEventListener('resize', updateSlidesToShow)
    return () => window.removeEventListener('resize', updateSlidesToShow)
  }, [])

  useEffect(() => {
    document.title = infusion.name;
  }, []);

  const infusion = InfusionPage
  if (!infusion) {
    document.title = "Капельница не найдена";
    return <div>Инфузия не найдена</div>
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="Капельница Clean Clinic" />
        <meta name="keywords" content="Капельница, красота, здоровье, Clean Clinic" />
      </Helmet>

      <div>
        <div className={css.upperSection}>
          <UpAnimation>
            <div className={css.upperSectionContent}>
              <img src={infusion.img} className={css.image} />
              <div className={css.upperSectionText}>
                <h1 className={css.name}>{infusion.name}</h1>

                <div className={css.upperInfo}>
                  <h3 className={css.cost}>{infusion.cost} руб.</h3>
                  <div className={css.durationSection}>
                    <img src={clock} width={width} />
                    {infusion.duration}
                  </div>
                </div>

                <Button />
              </div>
            </div>
          </UpAnimation>
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
    </>
  )
}

export default Infusion
