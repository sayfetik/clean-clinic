import { Helmet } from 'react-helmet-async'
import { FadeAnimation } from '../../animations'
import { GradientText, ServiceCards } from '../../components'
import { solarium } from '../../lib/data'
import css from './index.module.scss'

const Solarium = () => {
  const data = solarium

  return (
    <>
      <Helmet>
        <title>Солярий | Услуги</title>
        <meta name="description" content="Солярий Clean Clinic" />
        <meta name="keywords" content="Солярий, здоровье, красота, Clean Clinic" />
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
                    <h3 className={css.aboutTitle}>{data.paragraphTitle}</h3>
                    <ul className={css.bulletList}>
                      {data.paragraph.map((bullet, index) => (
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
        </div>
      </>
    </>
  )
}

export default Solarium
