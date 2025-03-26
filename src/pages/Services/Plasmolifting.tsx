import { Helmet } from 'react-helmet-async'
import { FadeAnimation } from '../../animations'
import { GradientText, Infusions } from '../../components'
import { plasmolifting } from '../../lib/data'
import css from './index.module.scss'

const Plasmolifting = () => {
  const data = plasmolifting

  return (
    <>
      <Helmet>
        <title>Плазмолифтинг | Услуги</title>
        <meta name="description" content="Плазмолифтинг Clean Clinic" />
        <meta name="keywords" content="Плазмолифтинг, здоровье, красота, Clean Clinic" />
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

          <Infusions items={data.services || []} imgWidth={150} />
        </div>
      </>
    </>
  )
}

export default Plasmolifting
