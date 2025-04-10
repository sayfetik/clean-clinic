// import infusionsImage from '/assets/infusions.svg'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Animation, Card, FadeAnimation, UpAnimation } from '../../animations'
import UpList from '../../animations/UpList'
import {
  Button,
  WhiteCard,
  InfusionInstructions,
  Infusions,
  Feedback,
  AboutSection,
  EnrollForm,
  Problems,
  DripSlider,
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
        <div className={css.water}>
          <div className={css.mainSlide}>
            <Animation>
              <h1 className="blue">{main.title}</h1>
              <div className={css.subtitle}>
                {main.subtitle.map((item, index) => (
                  <h3 key={index} className={css.titleAdditional}>
                    {item}
                  </h3>
                ))}
              </div>
              <Button text='Записаться на прием' />
            </Animation>
            <DripSlider />
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

          <h2 className='blue'>{main.serviceTitle}</h2>
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
