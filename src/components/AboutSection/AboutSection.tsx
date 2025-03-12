import patientImage from '/assets/patient.png'
import { Advantage } from '../../components'
import { main } from '../../lib/data'
import css from './index.module.scss'
import { FadeAnimation } from '../../animations'

const AboutSection = () => (
  <>
    <div className={css.aboutClinicContainer}>
      <FadeAnimation><img src={patientImage} width="95%" /></FadeAnimation>
      <div className={css.textAboutClinic}>
        <FadeAnimation>
          <h3 className={css.cleanClinic}>Clean Clinic</h3>
          <h2 className={css.weWork}>{main.weWork.title}</h2>
          <h3 className={css.text}>{main.weWork.text}</h3>
        </FadeAnimation>
      </div>
    </div>

    <div className={css.math}>
      <h2 className="blue">{main.weWork.numSpecialists}</h2> <h3>специалистов = </h3>
      <h2 className="blue">{main.weWork.numPatients}</h2> <h3>счастливых пациентов</h3>
    </div>

    <div className={css.advantages}>
      <div className={css.line}></div>
      {main.advantages.map((advantage, index) => (
        <Advantage key={index} {...advantage} />
      ))}
    </div>
  </>
)

export default AboutSection
