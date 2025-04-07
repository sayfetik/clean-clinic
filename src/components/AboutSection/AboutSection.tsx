import patientImage from '/assets/patient.png'
import { Advantage } from '../../components'
import { main } from '../../lib/data'
import css from './index.module.scss'
import { FadeAnimation } from '../../animations'

const AboutSection = () => (
  <div className={css.root}>
    <div className={css.aboutClinicContainer}>
      <FadeAnimation>
        <img src={patientImage} className={css.patientImage} width="95%" />
      </FadeAnimation>
      <div className={css.textAboutClinic}>
        <FadeAnimation>
          <h3 className={css.cleanClinic}>Clean Clinic</h3>
          <h2 className={css.weWork}>{main.weWork.title}</h2>
          <p className={css.text}>{main.weWork.text}</p>
        </FadeAnimation>
      </div>
    </div>

    <h3 className={css.additionalText}>{main.additionalText}</h3>

    <div className={css.advantages}>
      {main.advantages.map((advantage, index) => (
        <Advantage key={index} {...advantage} />
      ))}
    </div>
  </div>
)

export default AboutSection
