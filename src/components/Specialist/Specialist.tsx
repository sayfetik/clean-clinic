import { SpecialistType } from '../../lib/types'
import css from './index.module.scss'

const Specialist: React.FC<SpecialistType> = ({ image, name, profession, experience }) => (
  <div className={css.root}>
    <img src={typeof image === 'string' ? image : URL.createObjectURL(image)} className={css.photo} />
    <div className={css.info}>
      <h4>{name}</h4>
      <p>{profession}</p>
      <p>{experience}</p>
    </div>
  </div>
)

export default Specialist
