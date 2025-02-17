import css from './index.module.scss'
import infusions from '../../assets/infusions.svg'

const Main = () => {
  return <div className={css.page}>
    <div className={css.mainSlide}>
      <div>
        <div className={css.h1_main}>Клиника инфузионной терапии Clean Clinic в Оренбурге</div>
        <div className={css.h3_light}>Капельницы для красоты и здоровья</div>
      </div>
      <img src={infusions} width='450' />
    </div>
    <div></div>
  </div>
}

export default Main
