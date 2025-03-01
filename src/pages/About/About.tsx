import { GradientText, AboutSection, Specialist, Slider, Video, Document } from '../../components'
import { galleryImages, license, specialists } from '../../lib/data'
import css from './index.module.scss'

const About = () => (
  <div>
    <GradientText text="О клинике" />
    <div className={css.root}>
      <AboutSection />
      <div className={css.infusion}>
        <h2 className={css.infusionTitle}>Инфузионная терапия</h2>
        <p>
          Капельная или инфузионная терапия — метод лечения, основанный на прямом введении в кровоток различных
          коктейлей медикаментов, витаминов и микроэлементов, с целью быстрого достижения лучших показателей для вашего
          здоровья.
        </p>
        <p>
          IV-терапия только лечит различные заболевания но также используется для профилактики и общего оздоровления
          организма. Она помогает нормализовать водно-солевой обмен, очищать организм от токсинов и укреплять иммунитет.
          Индивидуальный подход к составлению капельниц позволяет каждому пациенту получить максимальную пользу от
          лечения.
        </p>
      </div>

      <div className={css.specialistsSection}>
        <h2 className={css.specialistsTitle}>Специалисты</h2>
        <div className={css.specialists}>
          {specialists.map((specialist, index) => (
            <Specialist key={index} {...specialist} />
          ))}
        </div>
      </div>

      <div className={css.excursion}>
        <h2 className={css.excursionTitle}>Видео-экскурсия</h2>
        <Video videoSrc="/assets/excursion.mov" />
      </div>

      <div className={css.gallery}>
        <h2 className={css.galleryTitle}>Галерея</h2>
        <Slider images={galleryImages} />
      </div>

      <div className={css.license}>
        <h2 className={css.licenseTitle}>Лицензия</h2>
        <div className={css.licenseImages}>
          {license.map((license, index) => (
            <Document image={license} key={index} size="small" />
          ))}
        </div>
      </div>
    </div>
  </div>
)

export default About
