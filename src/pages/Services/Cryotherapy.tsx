import { Helmet } from 'react-helmet-async'
import { FadeAnimation, Card } from '../../animations'
import { GradientText, ServiceCards } from '../../components'
import { cryotherapy } from '../../lib/data'
import css from './index.module.scss'

const Cryotherapy = () => {
  const data = cryotherapy

  return (
    <>
      <Helmet>
        <title>Криотерапия | Услуги</title>
        <meta name="description" content="Криотерапия Clean Clinic" />
        <meta name="keywords" content="Криотерапия, здоровье, красота, Clean Clinic" />
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
                      {data.indicationsText.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className={css.aboutTitle}>{data.contraindicationsTitle}</h3>
                    <ul className={css.bulletList}>
                      {data.contraindicationsText.map((bullet, index) => (
                        <li key={index}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <img className={css.image} src={data.img} />
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
