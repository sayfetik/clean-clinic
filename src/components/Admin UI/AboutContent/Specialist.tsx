import { TextInput } from '@mantine/core'
import { SpecialistType } from '../../../lib/types'
import MediaEditor from '../../MediaEditor/MediaEditor'
import css from './index.module.scss'

type SpecialistProps = {
  specialist: SpecialistType
  onChange: (updated: SpecialistType) => void
}

const Specialist: React.FC<SpecialistProps> = ({ specialist, onChange }) => {
  const imgSrc = typeof specialist.img === 'string' ? specialist.img : ''

  const handleEditImage = (file: File) => {
    onChange({ ...specialist, img: file })
  }

  return (
    <div className={css.specialist}>
      <MediaEditor initialSrc={imgSrc} onFileChange={handleEditImage} size={125} />
      <div className={css.specText}>
        <TextInput value={specialist.name} onChange={(e) => onChange({ ...specialist, name: e.target.value })} />
        <TextInput
          value={specialist.profession}
          onChange={(e) => onChange({ ...specialist, profession: e.target.value })}
        />
        <TextInput
          value={specialist.experience}
          onChange={(e) => onChange({ ...specialist, experience: e.target.value })}
        />
      </div>
    </div>
  )
}

export default Specialist
