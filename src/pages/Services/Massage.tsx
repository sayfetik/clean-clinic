import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FadeAnimation } from '../../animations'
import * as massageApi from '../../api/MassageAPI'
import { GradientText, ServiceCards } from '../../components'
import { emptyMassage } from '../../lib/empty'
import css from './index.module.scss'

const Massage = () => {
  const [data, setData] = useState(emptyMassage)

  useEffect(() => {
    const fetchData = async () => {
      const response = await massageApi.getMassage()
      setData(response)
    }
    fetchData()
  }, [])

  return (
    <>
      <Helmet>
        <title>Массаж | Услуги</title>
        <meta name="description" content="Массаж Clean Clinic" />
        <meta name="keywords" content="Массаж, стройность, здоровье, красота, Clean Clinic" />
      </Helmet>

      <>
        <GradientText text={data.title} />
        <div className={css.root}>
          <FadeAnimation>
            <div className={css.upperSection}>
              <div className={css.aboutText}>
                <div>
                  <h3 className={css.aboutTitle}>{data.whatItIsTitle}</h3>
                  <p className="black">{data.whatItIsText}</p>
                </div>
                <div>
                  <h3 className={css.aboutTitle}>{data.aboutTitle}</h3>
                  <ul className={css.bulletList}>
                    {data.about.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className={css.aboutTitle}>{data.advantagesTitle}</h3>
                  <ul className={css.bulletList}>
                    {data.advantages.map((bullet, index) => (
                      <li key={index}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <img
                className={css.image}
                src={typeof data.img === 'string' ? data.img : URL.createObjectURL(data.img)}
              />
            </div>
          </FadeAnimation>

          <h2 className={css.center}>{data.servicesTitle}</h2>
          <div className={css.margin}></div>
          <ServiceCards items={data.services || []} />
        </div>
      </>
    </>
  )
}

export default Massage
