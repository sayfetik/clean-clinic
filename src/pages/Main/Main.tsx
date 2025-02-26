import infusionsImage from '/assets/infusions.svg'
import patientImage from '/assets/patient.png'
import { Button, WhiteCard, InfusionInstructions, Advantage, Infusions, Feedback } from '../../components'
import { clinicAdvantages, mainInfusions, whiteCards } from '../../lib/data'
import css from './index.module.scss'

const Main = () => (
  <div className={css.mainPage}>
    <div className={css.water}>
      <div className={css.mainSlide}>
        <div>
          <h1 className="blue">Клиника инфузионной терапии Clean Clinic в Оренбурге</h1>
          <div className={css.titleAdditional}>Капельницы для красоты и здоровья</div>
          <Button />
        </div>
        <img src={infusionsImage} width="550" />
      </div>
    </div>

    <div className={css.page}>
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

      <div className={css.whyInfusions}>
        <h2>Почему выбирают IV-терапию?</h2>
        <div className={css.answer}>Подарить себе красоту и легкость</div>
        <p className={css.text}>
          <span className={css.bold}>Капельная или инфузионная терапия</span> — метод лечения, основанный на прямом
          введении в кровоток различных коктейлей медикаментов, витаминов и микроэлементов, с целью быстрого достижения
          лучших показателей для вашего здоровья.
        </p>
        <div className={css.row}>
          {whiteCards.map((whiteCard, index) => (
            <WhiteCard key={index} {...whiteCard} />
          ))}
        </div>
      </div>

      <div className={css.instructions}>
        <InfusionInstructions />
        <Button />
      </div>

      <div className={css.infusions}>
        <h2>Наши курсы капельниц</h2>
        <p className={css.infusionsDescription}>
          Все препараты, входящие в состав капельниц, имеют регистрационные удостоверения и разрешены к использованию на
          территории РФ. Перед назначением курса капельниц, мы подготавливаем индивидуальную программу на основе
          результатов ваших анализов.
        </p>
        <Infusions items={mainInfusions} />
        <Button text="Записаться к терапевту" />
      </div>
    </div>

    <div className={css.water}>
      <Feedback />
    </div>
  </div>
)

export default Main
