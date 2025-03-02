import { GradientText } from '../../components'
import fileGrey from '/assets/fileGrey.svg'
import css from './index.module.scss'

const Documents = () => (
  <div>
    <GradientText text="Документы" />
    <div className={css.root}>
      {' '}
      {/* при нажатии сделать чтобы скачивался файл */}
      <img src={fileGrey} />
      <p className={css.text}>Документ документ документ документ</p>
    </div>
  </div>
)

export default Documents
