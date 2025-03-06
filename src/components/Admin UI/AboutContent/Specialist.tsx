import { TextInput } from '@mantine/core'
import { SpecialistType } from '../../../lib/types'
import MediaEditor from '../../MediaEditor/MediaEditor'
import css from './index.module.scss'

type SpecialistProps = { specialist: SpecialistType }

const Specialist: React.FC<SpecialistProps> = ({ specialist }) => {
  const { img, name, profession, experience } = specialist

  const handleEditImage = () => {} // обработчик для изменения изображения

  return (
    <div className={css.specialist}>
      <MediaEditor initialSrc={img} onFileChange={handleEditImage} size={100} />
      <div className={css.specText}>
        <TextInput value={name} onChange={() => {}} />
        <TextInput value={profession} onChange={() => {}} />
        <TextInput value={experience} onChange={() => {}} />
      </div>
    </div>
  )
}

export default Specialist
