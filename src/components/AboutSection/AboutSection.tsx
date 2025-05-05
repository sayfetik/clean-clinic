import patientImage from '/assets/patient.png'
import { Advantage } from '../../components'
import css from './index.module.scss'
import { FadeAnimation } from '../../animations'

type weWorkType = {
  title: string
  text: string
  numSpecialists: number
  numPatients: number
}

type AdvantagesType = { title: string; text: string }[]

type AboutSectionProps = {
  weWork: weWorkType
  additionalText: string
  advantages: AdvantagesType
}

const AboutSection: React.FC<AboutSectionProps> = ({ weWork, additionalText, advantages }) => (
  <div className={css.root}>
    <div className={css.aboutClinicContainer}>
      <FadeAnimation>
        <img src={patientImage} className={css.patientImage} width="95%" />
      </FadeAnimation>
      <div className={css.textAboutClinic}>
        <FadeAnimation>
          <h3 className={css.cleanClinic}>Clean Clinic</h3>
          <h2 className={css.weWork}>{weWork.title}</h2>
          <p className={css.text}>{weWork.text}</p>
        </FadeAnimation>
      </div>
    </div>

    <h3 className={css.additionalText}>{additionalText}</h3>

    <div className={css.advantages}>
      {advantages.map((advantage, index) => (
        <Advantage key={index} {...advantage} />
      ))}
    </div>
  </div>
)

export default AboutSection
