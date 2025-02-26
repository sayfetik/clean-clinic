import css from './index.module.scss'

const YandexMap: React.FC = () => (
  <div className={css.root}>
    <iframe
      className={css.root}
      src="https://yandex.ru/map-widget/v1/?ll=55.137503%2C51.778207&amp;mode=search&amp;text=Clean%20Clinic%20Оренбург&amp;z=16"
      width="100%"
      height="100%"
    ></iframe>
  </div>
)

export default YandexMap
