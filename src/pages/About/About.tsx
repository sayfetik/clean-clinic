import { Helmet } from "react-helmet-async";
import { FadeAnimation, UpAnimation, UpListAnimation } from '../../animations'
import { GradientText, AboutSection, Specialist, Slider, Video, Document } from '../../components'
import { galleryImages, license, about } from '../../lib/data'
import css from './index.module.scss'

const About = () => (
  <>
    <Helmet>
      <title>О Clean Clinic</title>
      <meta name="description" content="О клинике" />
      <meta name="keywords" content="О клинике, документы, специалисты, контакты" />
    </Helmet>

    <div>
      <GradientText text="О клинике" />
      <div className={css.root}>
        <AboutSection />
        <div className={css.infusion}>
          <UpAnimation>
          <h2 className={css.infusionTitle}>{about.title}</h2>
          <p>{about.text1}</p>
          <p>{about.text2}</p>
          </UpAnimation>
        </div>

        <div className={css.specialistsSection}>
          <h2 className={css.specialistsTitle}>Специалисты</h2>
          <UpListAnimation>
            <div className={css.specialists}>
              {about.specialists.map((specialist, index) => (
                <Specialist key={index} {...specialist} /> /* ФОТКИ ПОЛУЧИТЬ С БЕКА */
              ))}
            </div>
          </UpListAnimation>
        </div>

        <FadeAnimation>
          <div className={css.excursion}>
            <h2 className={css.excursionTitle}>Видео-экскурсия</h2>
            <Video videoSrc="/assets/excursion.mov" /> {/*ПОЛУЧИТЬ С БЕКА*/}
          </div>
        </FadeAnimation>

        <div className={css.gallery}>
          <h2 className={css.galleryTitle}>Галерея</h2>
          <Slider images={galleryImages} /> {/*ПОЛУЧИТЬ С БЕКА*/}
        </div>

        <div className={css.license}>
          <h2 className={css.licenseTitle}>Лицензия</h2>
          <div className={css.licenseImages}>
            {license.map((license, index) => (
              <Document image={license} key={index} size="small" /> /*ПОЛУЧИТЬ С БЕКА*/
            ))}
          </div>
        </div>
      </div>
    </div>
  </>
)

export default About
