import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { FadeAnimation } from '../../animations'
import * as homeVisitApi from '../../api/HomeVisitAPI'
import { GradientText, ServiceCards } from '../../components'
import { emptyHomeVisit } from '../../lib/empty'
import css from './index.module.scss'

const HomeVisit = () => {
  const [data, setData] = useState(emptyHomeVisit)

  useEffect(() => {
    const fetchData = async () => {
      const response = await homeVisitApi.getHomeVisitPage()
      setData(response)
    }
    fetchData()
  }, [])

  return (
    <>
      <Helmet>
        <title>Анализы | Услуги</title>
        <meta name="description" content="Анализы Clean Clinic" />
        <meta name="keywords" content="Анализы, здоровье, красота, Clean Clinic" />
      </Helmet>

      <>
        <GradientText text={data.title} />
        <div className={css.root}>
          <FadeAnimation>
            <div className={css.upperSection}>
              <div className={css.aboutText}>
                <div>
                  <p className="black">{data.paragraph1}</p>
                  <div className={css.margin}></div>
                  <p className="black">{data.paragraph2}</p>
                  <div className={css.margin}></div>
                  <p className="black">{data.paragraph3}</p>
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

export default HomeVisit
