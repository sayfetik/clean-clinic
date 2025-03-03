import patientImage from '/assets/patient.png'
import { Advantage } from '../../components'
import { main } from '../../lib/data'
import css from './index.module.scss'

const AboutSection = () => (
  <>
    <div className={css.aboutClinicContainer}>
      <img src={patientImage} width="450" />
      <div className={css.textAboutClinic}>
        <h3 className={css.cleanClinic}>Clean Clinic</h3>
        <h2 className={css.weWork}>{main.weWork.title}</h2>
        <p>{main.weWork.text}</p>
      </div>
    </div>

    <div className={css.math}>
      <h2 className="blue">{main.weWork.numSpecialists}</h2> <h3>специалистов = </h3>
      <h2 className="blue">{main.weWork.numPatients}</h2> <h3>счастливых пациентов</h3>
    </div>

    <div className={css.advantages}>
      {main.advantages.map((advantage, index) => (
        <Advantage key={index} {...advantage} />
      ))}
    </div>
  </>
)

export default AboutSection
