import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FadeAnimation, UpAnimation, UpListAnimation } from '../../animations'
import * as aboutPageApi from '../../api/AboutAPI'
import * as mainPageApi from '../../api/MainAPI'
import { GradientText, AboutSection, Specialist, Slider, Video } from '../../components'
import Doc from '../../components/Doc/Doc'
import { galleryImages } from '../../lib/data'
import { emptyAbout } from '../../lib/empty'
import { DocumentType, MainPageType } from '../../lib/types'
import css from './index.module.scss'

type AboutProps = {
  main: MainPageType
  setMain: React.Dispatch<React.SetStateAction<MainPageType>>
  license: DocumentType
}

const About: React.FC<AboutProps> = ({ main, setMain, license }) => {
  const [about, setAbout] = useState(emptyAbout)

  useEffect(() => {
    const fetchData = async () => {
      const data = await aboutPageApi.getAboutPage()
      setAbout(data)
      const mainData = await mainPageApi.getMainPage()
      setMain(mainData)
    }
    fetchData()
    document.title = 'О Clean Clinic'
  }, [])

  return (
    <>
      <Helmet>
        <title>О Clean Clinic</title>
        <meta name="description" content="Узнайте больше о клинике Clean Clinic в Оренбурге: опытные специалисты, современное оборудование, индивидуальный подход к каждому пациенту." />
        <meta name="keywords" content="О клинике, Clean Clinic, Оренбург, специалисты, современное оборудование, здоровье" />
      </Helmet>

      <div>
        <GradientText text="О клинике" />
        <div className={css.root}>
          <AboutSection weWork={main.weWork} additionalText={main.additionalText} advantages={main.advantages} />
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
                  <Specialist key={index} {...specialist} />
                ))}
              </div>
            </UpListAnimation>
          </div>

          <FadeAnimation>
            <div className={css.excursion}>
              <h2 className={css.excursionTitle}>Видео-экскурсия</h2>
              <Video videoSrc="/assets/excursion.mov" />
            </div>
          </FadeAnimation>

          <div className={css.gallery}>
            <h2 className={css.galleryTitle}>Галерея</h2>
            <Slider images={galleryImages} />
          </div>

          <div className={css.license}>
            <h2 className={css.licenseTitle}>Лицензия</h2>
            <Doc title={license.title} img={license.img} />
          </div>
        </div>
      </div>
    </>
  )
}

export default About
