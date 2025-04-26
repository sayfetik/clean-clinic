// import infusionsImage from '/assets/infusions.svg'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Animation, Card, FadeAnimation, UpAnimation } from '../../animations'
import UpList from '../../animations/UpList'
import forBanner from '/assets/forBanner.png'
import {
  Button,
  WhiteCard,
  InfusionInstructions,
  Infusions,
  Feedback,
  AboutSection,
  EnrollForm,
  Problems,
  ServicesSlider,
  FAQ,
} from '../../components'
import { main } from '../../lib/data'
import css from './index.module.scss'

const Main = () => {
  useEffect(() => {
    // const main = получить с бека страницу
    // получить картинку infusionsImage
  }, [])
  return (
    <>
      <Helmet>
        <title>Clean Clinic</title>
        <meta name="description" content="Clean Clinic" />
        <meta name="keywords" content="Капельницы, массаж, криотерапия, красота, здоровье, контакты" />
      </Helmet>

      <div className={css.mainPage}>
        <div className={css.banner}>
          <div className={css.mainSlide}>
            <Animation>
              <h1 className={css.titleBlue}>Клиника</h1>
              <h1 className={css.titleBlue}>инфузионной</h1>
              <h1 className={css.titleBlue}>терапии</h1>
              <h1 className={css.titleWhite}>«Clean Clinic»</h1>
              <h2 className={css.subtitle}>в Оренбурге</h2>
            </Animation>
            <img src={forBanner} alt="" className={css.bannerImage} />
          </div>
        </div>

        <div className={css.page}>
          <AboutSection />

          <UpAnimation>
            <EnrollForm />
          </UpAnimation>

          <div className={css.whyInfusions}>
            <UpList>
              <h2>{main.whyInfusions.title}</h2>
              <div className={css.answer}>{main.whyInfusions.answer}</div>
              <p className={css.text}>{main.whyInfusions.text1}</p>
              <p className={css.text}>{main.whyInfusions.text2}</p>
            </UpList>
            <div className={css.row}>
              {main.whiteCards.map((whiteCard, index) => (
                <Card key={index}>
                  <WhiteCard {...whiteCard} />
                </Card>
              ))}
            </div>
          </div>

          <Problems />

          <FadeAnimation>
            <div className={css.instructions}>
              <InfusionInstructions />
              <Button />
            </div>
          </FadeAnimation>

          <div className={css.infusions}>
            <h2>{main.infusions.title}</h2>
            <p className={css.infusionsDescription}>{main.infusions.text}</p>
            <Infusions items={main.infusions.infusions} />
            <Button text="Записаться к терапевту" />
          </div>

          <h2 className="blue">{main.serviceTitle}</h2>
          <div className={css.services}>
            <ServicesSlider />
          </div>

          <div className={css.faq}>
            <h2>{main.faqTitle}</h2>
            <FAQ />
          </div>
        </div>

        <div className={css.water}>
          <Feedback />
        </div>
      </div>
    </>
  )
}

export default Main
