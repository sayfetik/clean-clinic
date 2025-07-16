import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FadeAnimation, Card } from '../../animations'
import { Filters, GradientText } from '../../components'
import { InfusionCatalogType } from '../../lib/types'
import css from './index.module.scss'

type InfusionCatalogProps = {
  problemImage: string | File
  problemTitle: string
  problems: { title: string; text: string }[]
  data: InfusionCatalogType
}

const InfusionCatalog: React.FC<InfusionCatalogProps> = ({ problemImage, problemTitle, problems, data }) => {
  const Problems = lazy(() => import('../../components/Problems/Problems'))
  const Infusions = lazy(() => import('../../components/Infusions/Infusions'))
  const [chosenId, setChosenId] = useState(0)
  const filterKeys = useMemo(() => {
    let keys: string[] = ['Все капельницы']
    for (let i = 0; i < data.infusionsByCategory.length; i++) {
      keys.push(data.infusionsByCategory[i].category)
    }
    return keys
  }, [data])

  useEffect(() => {
    document.title = 'Капельницы | Услуги'
  }, [])

  return (
    <>
      <Helmet>
        <title>Капельницы | Услуги</title>
        <meta
          name="description"
          content="Капельницы для восстановления и укрепления здоровья в клинике Клин Клиник, Оренбург. Индивидуальные программы, опытные врачи, лицензии."
        />
        <meta
          name="keywords"
          content="Капельницы Оренбург, инфузионная терапия, Клин Клиник, восстановление, здоровье, врачи, лицензия"
        />
      </Helmet>

      <>
        <GradientText text={data.title} />
        <div className={css.root}>
          <FadeAnimation>
            <div className={css.upperSection}>
              <div className={css.aboutText}>
                <div>
                  <h2 className={css.aboutTitle}>{data.whatItIsTitle}</h2>
                  <p className={css.paragraph}>{data.whatItIsText1}</p>
                  <p className={css.paragraph}>{data.whatItIsText2}</p>
                </div>
              </div>
              <img
                className={css.image}
                src={typeof data.img === 'string' ? data.img : URL.createObjectURL(data.img)}
              />
            </div>
            <div>
              <div className={css.advantages}>
                <h2>{data.advantagesTitle}</h2>
                <p className="black">{data.advantagesText}</p>
                <ul className={css.bulletList}>
                  {data.advantages.map((bullet, index) => (
                    <li key={index}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeAnimation>

          <Suspense fallback={<div>Загрузка...</div>}>
            <Problems problemImage={problemImage} problemTitle={problemTitle} problems={problems} />
          </Suspense>

          <h2 className={css.center}>{data.servicesTitle}</h2>
          <div className={css.filters}>
            <Filters filters={filterKeys} chosenOption={{ chosenId, setChosenId }} />
          </div>
          <Suspense fallback={<div>Загрузка...</div>}>
            <Infusions items={data.infusionsByCategory} category={filterKeys[chosenId]} />
          </Suspense>

          <Card>
            <div className={css.howToChoose}>
              <h2 className={css.title}>{data.howToChooseCard.title}</h2>
              <div className={css.text}>
                <h3 className={css.answer}>{data.howToChooseCard.additionalText}</h3>
                <p className="black">{data.howToChooseCard.text}</p>
              </div>
            </div>
          </Card>
        </div>
      </>
    </>
  )
}

export default InfusionCatalog
