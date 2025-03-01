import patientImage from '/assets/patient.png'
import { Advantage } from '../../components'
import { clinicAdvantages } from '../../lib/data'
import css from './index.module.scss'

const AboutSection = () => (
  <>
    <div className={css.aboutClinicContainer}>
      <img src={patientImage} width="450" />
      <div className={css.textAboutClinic}>
        <h3 className={css.cleanClinic}>Clean Clinic</h3>
        <h2 className={css.weWork}>Мы работаем ради Вашего здоровья</h2>
        <p>
          Концепция клиники — сделать доступными как можно большему количеству людей научные возможности по улучшению
          качества и продления активной жизни.
        </p>
      </div>
    </div>

    <div className={css.math}>
      <h2 className="blue">3832</h2> <h3>специалистов = </h3>
      <h2 className="blue">38750</h2> <h3>счастливых пациентов</h3>
    </div>

    <div className={css.advantages}>
      {clinicAdvantages.map((advantage, index) => (
        <Advantage key={index} {...advantage} />
      ))}
    </div>
  </>
)

export default AboutSection
