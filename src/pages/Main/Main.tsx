import { Suspense, lazy, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Animation, Card, FadeAnimation, UpAnimation } from '../../animations'
import UpList from '../../animations/UpList'
import forBanner from '/assets/forBanner.png'
import { Button, WhiteCard, AboutSection, EnrollForm, Problems, ServicesSlider } from '../../components'
import { emptyCategoryType } from '../../lib/empty'
import { MainPageType } from '../../lib/types'
import css from './index.module.scss'

const Main: React.FC<{ main: MainPageType }> = ({ main }) => {
  const InfusionInstructions = lazy(() => import('../../components/InfusionInstructions/InfusionInstructions'))
  const Infusions = lazy(() => import('../../components/Infusions/Infusions'))
  const FAQ = lazy(() => import('../../components/FAQ/FAQ'))
  const Feedback = lazy(() => import('../../components/Feedback/Feedback'))
  
  useEffect(() => {
    document.title = 'Clean Clinic'
  }, [])

  return (
    <>
      <Helmet>
        <title>Clean Clinic</title>
        <meta name="description" content="Clean Clinic — современная клиника инфузионной терапии, массажа, криотерапии и анализов в Оренбурге. Запишитесь на капельницы и другие процедуры для здоровья и красоты." />
        <meta name="keywords" content="Clean Clinic, клиника, Оренбург, капельницы, инфузионная терапия, массаж, криотерапия, анализы, здоровье, красота" />
        <meta property="og:title" content="Clean Clinic — Клиника инфузионной терапии в Оренбурге" />
        <meta property="og:description" content="Капельницы, массаж, криотерапия, анализы. Современная клиника в Оренбурге. Запишитесь онлайн!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cleanoren.ru/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Clean Clinic — Клиника инфузионной терапии в Оренбурге" />
        <meta name="twitter:description" content="Капельницы, массаж, криотерапия, анализы. Современная клиника в Оренбурге." />
        <meta name="twitter:image" content="https://cleanoren.ru/og-image.jpg" />
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
            <EnrollForm title={main.form.title} />
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

          <Problems problemImage={main.problemImage} problems={main.problems} problemTitle={main.problemTitle} />

          <FadeAnimation>
            <div className={css.instructions}>
              <Suspense fallback={<div>Загрузка...</div>}>
                <InfusionInstructions {...main.infusionInstructions} />
              </Suspense>
              <Button />
            </div>
          </FadeAnimation>

          <div className={css.infusions}>
            <h2>{main.infusions.title}</h2>
            <p className={css.infusionsDescription}>
              Все препараты, входящие в состав капельниц, имеют регистрационные удостоверения и разрешены к
              использованию на территории РФ. Перед назначением курса капельниц, мы подготавливаем индивидуальную
              программу на основе результатов ваших анализов.
            </p>
            <Suspense fallback={<div>Загрузка...</div>}>
              <Infusions items={emptyCategoryType} category="main" />
            </Suspense>
            <Button text="Записаться к терапевту" />
          </div>

          <h2 className="blue">{main.services.tittle}</h2>
          <div className={css.services}>
            <ServicesSlider services={main.services.services || []} />
          </div>

          <div className={css.faq}>
            <h2>{main.faq.faqTitle}</h2>
            <Suspense fallback={<div>Загрузка...</div>}>
              <FAQ faqs={main.faq.faqs} />
            </Suspense>
          </div>
        </div>

        <div className={css.water}>
          <Suspense fallback={null}>
            <Feedback feedback={main.feedback} />
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default Main
