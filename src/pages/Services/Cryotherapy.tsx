import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FadeAnimation, Card } from '../../animations'
import * as cryo from '../../api/CryotherapyAPI'
import { GradientText, ServiceCards } from '../../components'
import { emptyCryotherapy } from '../../lib/empty'
import css from './index.module.scss'

const Cryotherapy = () => {
  const [data, setData] = useState(emptyCryotherapy)

  useEffect(() => {
    const fetchData = async () => {
      const response = await cryo.getCryo()
      setData(response)
    }
    fetchData()
    document.title = 'Криотерапия | Услуги'
  }, [])

  return (
    <>
      <Helmet>
        <title>Криотерапия | Услуги</title>
        <meta
          name="description"
          content="Криотерапия для здоровья и красоты в клинике Клин Клиник, Оренбург. Современное оборудование, опытные специалисты."
        />
        <meta name="keywords" content="Криотерапия Оренбург, Клин Клиник, здоровье, красота, лицензия, специалисты" />
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

                <div className={css.infoColumns}>
                  <div>
                    <h3 className={css.aboutTitle}>{data.indicationsTitle}</h3>
                    <ul className={css.bulletList}>
                      {data.indications.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className={css.aboutTitle}>{data.contraindicationsTitle}</h3>
                    <ul className={css.bulletList}>
                      {data.contraindications.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
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

          <Card>
            <div className={css.howToChoose}>
              <h2 className={css.title}>{data.procedureTitle}</h2>
              <div className={css.text}>
                <p className="black">{data.procedureText}</p>
              </div>
            </div>
          </Card>
        </div>
      </>
    </>
  )
}

export default Cryotherapy
