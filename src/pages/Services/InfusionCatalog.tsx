import { useState } from 'react'
import { FadeAnimation, Card } from '../../animations'
import { Filters, GradientText, Infusions, Problems } from '../../components'
import { infusionCatalog } from '../../lib/data'
import css from './index.module.scss'

const InfusionCatalog = () => {
  const [chosenId, setChosenId] = useState(0)
  const data = infusionCatalog;
  const filterKeys = Object.keys(data.infusions);
  const filterKey = filterKeys[chosenId] || filterKeys[0];

  return (
    <>
      <GradientText text={data.title} />
      <div className={css.root}>
          <FadeAnimation>
            <div className={css.upperSection}>
                  <div className={css.aboutText}>
                      <div>
                        <h2 className={css.aboutTitle}>{data.whatItIsTitle}</h2>
                        <p className='black'>{data.whatItIsText}</p>
                      </div>
                      <div>
                        <h3 className={css.aboutTitle}>{data.advantagesTitle}</h3>
                        <ul className={css.bulletList}>
                          {data.advantagesText.map((bullet,index)=>(
                            <li key={index}>{bullet}</li>
                          ))}
                        </ul>
                    </div>
                  </div>
              <img className={css.image} src={data.img}/>
            </div>
          </FadeAnimation>

          <Problems />

          <h2 className={css.center}>Выберите свою капельницу</h2>
          <div className={css.filters}>
            <Filters filters={filterKeys} chosenOption={{ chosenId, setChosenId }} />
          </div>
        <Infusions items={data.infusions[filterKey] || []} />

        <Card>
          <div className={css.howToChoose}>
            <h2 className={css.title}>Какой курс капельниц выбрать?</h2>
            <div className={css.text}>
              <h4 className={css.answer}>Мы разрабатываем индивидуальные курсы</h4>
              <p className='black'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud </p>
            </div>
          </div>
        </Card>
  
      </div>
    </>
  )
}

export default InfusionCatalog
