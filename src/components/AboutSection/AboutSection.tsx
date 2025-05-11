import { FadeAnimation } from '../../animations'
import { Advantage } from '../../components'
import { AdvantageType } from '../../lib/types'
import css from './index.module.scss'

type weWorkType = {
  title: string
  text: string
  img: string | File
  numSpecialists: number
  numPatients: number
}

type AboutSectionProps = {
  weWork: weWorkType
  additionalText: string
  advantages: AdvantageType[]
}

const AboutSection: React.FC<AboutSectionProps> = ({ weWork, additionalText, advantages }) => (
  <div className={css.root}>
    <div className={css.aboutClinicContainer}>
      <FadeAnimation>
        <img
          src={typeof weWork.img === 'string' ? weWork.img : URL.createObjectURL(weWork.img)}
          className={css.patientImage}
          width="95%"
        />
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
