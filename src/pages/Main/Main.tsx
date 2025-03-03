import infusionsImage from '/assets/infusions.svg'
import { Button, WhiteCard, InfusionInstructions, Infusions, Feedback, AboutSection } from '../../components'
import { main } from '../../lib/data'
import css from './index.module.scss'
import { useEffect } from 'react'

const Main = () => {
  useEffect(()=>{
// const main = получить с бека страницу
 // получить картинку infusionsImage
  }, [])
  return (
  <div className={css.mainPage}>
    <div className={css.water}>
      <div className={css.mainSlide}>
        <div>
          <h1 className="blue">{main.title}</h1>
          <div className={css.titleAdditional}>{main.subtitle}</div>
          <Button />
        </div>
        <img src={infusionsImage} width="550" />
      </div>
    </div>

    <div className={css.page}>
      <AboutSection />

      <div className={css.whyInfusions}>
        <h2>{main.whyInfusions.title}</h2>
        <div className={css.answer}>{main.whyInfusions.answer}</div>
        <p className={css.text}>{main.whyInfusions.text}</p>
        <div className={css.row}>
          {main.whiteCards.map((whiteCard, index) => (
            <WhiteCard key={index} {...whiteCard} />
          ))}
        </div>
      </div>

      <div className={css.instructions}>
        <InfusionInstructions />
        <Button />
      </div>

      <div className={css.infusions}>
        <h2>{main.infusions.title}</h2>
        <p className={css.infusionsDescription}>{main.infusions.text}</p>
        <Infusions items={main.infusions.infusions} />
        <Button text="Записаться к терапевту" />
      </div>
    </div>

    <div className={css.water}>
      <Feedback />
    </div>
  </div>)
}

export default Main
