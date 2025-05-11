import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FadeAnimation, Card } from '../../animations'
import * as infusionsApi from '../../api/InfusionsAPI'
import { Filters, GradientText, Infusions, Problems } from '../../components'
import { emptyInfusionCatalog } from '../../lib/empty'
import { InfusionCatalogType } from '../../lib/types'
import css from './index.module.scss'

type InfusionCatalogProps = {
  problemImage: string | File
  problemTitle: string
  problems: { title: string; text: string }[]
}

const InfusionCatalog: React.FC<InfusionCatalogProps> = ({ problemImage, problemTitle, problems }) => {
  const [chosenId, setChosenId] = useState(0)
  const [data, setData] = useState<InfusionCatalogType>(emptyInfusionCatalog)

  useEffect(() => {
    infusionsApi.getInfusionCatalog().then(setData)
  }, [])
  const filterKeys = Object.keys(data.infusions)
  const filterKey = filterKeys[chosenId] || filterKeys[0]

  return (
    <>
      <Helmet>
        <title>Капельницы | Услуги</title>
        <meta name="description" content="Капельницы Clean Clinic" />
        <meta name="keywords" content="Капельницы, здоровье, красота, Clean Clinic" />
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
              <img className={css.image} src={typeof data.img === 'string' ? data.img : URL.createObjectURL(data.img)} />
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

          <Problems problemImage={problemImage} problemTitle={problemTitle} problems={problems} />

          <h2 className={css.center}>{data.servicesTitle}</h2>
          <div className={css.filters}>
            <Filters filters={filterKeys} chosenOption={{ chosenId, setChosenId }} />
          </div>
          <Infusions items={data.infusions[filterKey] || []} />

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
