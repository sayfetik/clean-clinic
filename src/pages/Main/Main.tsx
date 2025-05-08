// import infusionsImage from '/assets/infusions.svg'
import { useEffect, useState } from 'react'
import { Suspense, lazy } from 'react'
import { Helmet } from 'react-helmet-async'
import { Animation, Card, FadeAnimation, UpAnimation } from '../../animations'
import UpList from '../../animations/UpList'
import forBanner from '/assets/forBanner.png'
import * as mainPageApi from '../../api/MainAPI'
import {
  Button,
  WhiteCard,
  InfusionInstructions,
  Infusions,
  AboutSection,
  EnrollForm,
  Problems,
} from '../../components'
import { emptyMainPage } from '../../lib/empty'
import css from './index.module.scss'

const Main = () => {
  const FAQ = lazy(() => import('../../components/FAQ/FAQ'))
  const Feedback = lazy(() => import('../../components/Feedback/Feedback'))
  const ServicesSlider = lazy(() => import('../../components/ServicesSlider/ServicesSlider'))

  const [main, setMain] = useState(emptyMainPage)

  useEffect(() => {
    const fetchMainPage = async () => {
      const data = await mainPageApi.getMainPage()
      setMain(data)
    }

    fetchMainPage()
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
          <AboutSection weWork={main.weWork} additionalText={main.additionalText} advantages={main.advantages} />

          <UpAnimation>
            <EnrollForm title={main.form.title}/>
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

          <Problems problemImage={main.problemImage} problems={main. problems} problemTitle={main.problemTitle}/>

          <FadeAnimation>
            <div className={css.instructions}>
              <InfusionInstructions {...main.infusionInstructions}/>
              <Button />
            </div>
          </FadeAnimation>

          <div className={css.infusions}>
            <h2>{main.infusions.title}</h2>
            <p className={css.infusionsDescription}>{main.infusions.text}</p>
            <Infusions items={main.infusions.infusions} />
            <Button text="Записаться к терапевту" />
          </div>

          <h2 className="blue">{main.services.tittle}</h2>
          <div className={css.services}>
            <Suspense fallback={<div>Загрузка...</div>}>
              <ServicesSlider services={main.services.services || []}/>
            </Suspense>
          </div>

          <div className={css.faq}>
            <h2>{main.faq.faqTitle}</h2>
            <Suspense fallback={<div>Загрузка...</div>}>
              <FAQ faqs={main.faq.faqs}/>
            </Suspense>
          </div>
        </div>

        <div className={css.water}>
          <Suspense fallback={null}>
            <Feedback feedback={main.feedback}/>
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Main
