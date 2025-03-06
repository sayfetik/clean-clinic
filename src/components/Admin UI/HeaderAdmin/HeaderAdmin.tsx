import css from './index.module.scss'

const HeaderAdmin = () => {
  return (
    <div className={css.header}>
      <img src="https://cleanoren.ru/wp-content/uploads/2024/02/logo1.png" alt="Clean Clinic" className={css.logo} />
      <h4>Администратор</h4>
    </div>
  )
}

export default HeaderAdmin
