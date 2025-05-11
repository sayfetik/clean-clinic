import { TextInput, Button } from '@mantine/core'
import * as aboutPageApi from '../../../api/AboutAPI'
import { SpecialistType } from '../../../lib/types'
import MediaEditor from '../../MediaEditor/MediaEditor'
import UpdateButton from '../UpdateButton'
import css from './index.module.scss'

const emptySpecialist: SpecialistType = {
  id: 0,
  name: '',
  profession: '',
  experience: '',
  image: '',
  isNew: true,
}

type Props = {
  specialists: SpecialistType[]
  onChange: (specialists: SpecialistType[]) => void
}

const SpecialistList: React.FC<Props> = ({ specialists, onChange }) => {

  const handleAdd = () => {
    onChange([...specialists, { ...emptySpecialist, id: Date.now() }])
  }

  const handleChange = (index: number, field: keyof SpecialistType, value: string) => {
    onChange(
      specialists.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    )
  }

  const handleImageChange = (index: number, file: File) => {
    onChange(
      specialists.map((item, i) => (i === index ? { ...item, image: file } : item))
    )
  }

  const handleSave = async (index: number) => {
    const item = specialists[index]
    let response: SpecialistType
    if (!item.id || item.id < 0 || item.isNew) {
      response = await aboutPageApi.createSpecialist({
        Name: item.name,
        Profession: item.profession,
        Experience: item.experience,
        file: item.image as File,
      })
      onChange(
        specialists.map((s, i) =>
          i === index ? { ...s, id: response.id, isNew: false } : s
        )
      )
    } else {
      response = await aboutPageApi.updateSpecialist({
        Id: item.id,
        Name: item.name,
        Profession: item.profession,
        Experience: item.experience,
        file: item.image instanceof File ? item.image : '',
      })
      onChange(
        specialists.map((s, i) =>
          i === index ? { ...s, ...response, isNew: false } : s
        )
      )
    }
  }

  const handleDelete = async (id: number) => {
    onChange(specialists.filter((s) => s.id !== id))
    if (id && id > 0) {
      await aboutPageApi.deleteSpecialist(id)
    }
  }

  return (
    <div>
      <div className={css.specialists}>
        {specialists.map((item, index) => (
          <div key={item.id ?? index} className={css.specialistItem}>
            <div className={css.specialist}>
              <MediaEditor
                initialSrc={
                  typeof item.image === 'string'
                    ? item.image
                    : item.image instanceof File
                    ? URL.createObjectURL(item.image)
                    : ''
                }
                onFileChange={(file) => handleImageChange(index, file)}
                size={125}
              />
              <div className={css.specText}>
                <TextInput
                  value={item.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  placeholder='Фамилия Имя'
                />
                <TextInput
                  value={item.profession}
                  placeholder='Специальность'
                  onChange={(e) => handleChange(index, 'profession', e.target.value)}
                />
                <TextInput
                  value={item.experience}
                  placeholder='Опыт'
                  onChange={(e) => handleChange(index, 'experience', e.target.value)}
                />
              </div>
            </div>
                <UpdateButton onClick={() => handleSave(index)} />
                <Button
                  variant="light"
                  color="red"
                  onClick={() => handleDelete(item.id)}
                  className={css.deleteButton}
                >
                  Удалить
                </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleAdd} variant="outline">
        Добавить специалиста
      </Button>
    </div>
  )
}

export default SpecialistList