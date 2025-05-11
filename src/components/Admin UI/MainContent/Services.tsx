import { TextInput, Button, ActionIcon } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import * as mainPageApi from '../../../api/MainAPI'
import MediaEditor from '../../MediaEditor/MediaEditor'
import UpdateButton from '../UpdateButton'
import css from './index.module.scss'

type ServiceType = {
  id: number
  name: string
  img: string | File
  isNew?: boolean
}

type ServicesProps = {
  services: ServiceType[]
  onChange: (services: ServiceType[]) => void
  onImageChange: (index: number, file: File) => void
}

const Services: React.FC<ServicesProps> = ({ services, onChange, onImageChange }) => {
  const handleAddService = () => {
    onChange([...services, { id: Date.now(), name: '', img: '', isNew: true }])
  }

  const handleNameChange = (index: number, value: string) => {
    const updated = services.map((item, i) => (i === index ? { ...item, name: value } : item))
    onChange(updated)
  }

  const handleRemoveService = (index: number) => {
    const updated = services.filter((_, i) => i !== index)
    onChange(updated)
  }

  const handleServiceSave = async (index: number) => {
    const service = services[index]
    if (service.isNew) {
      const response = await mainPageApi.createService({
        id: String(services.length),
        name: service.name,
        img: service.img,
      })
      const updated = services.map((item, i) => (i === index ? { ...item, id: response.id, isNew: false } : item))
      onChange(updated)
    } else {
      await mainPageApi.updateService({
        Id: service.id,
        Name: service.name,
        Img: service.img,
      })
    }
  }

  return (
    <>
      <div className={css.grid3}>
        {services.map((card, index) => (
          <div key={card.id ?? index} className={css.block}>
            <MediaEditor
              initialSrc={typeof card.img === 'string' ? card.img : ''}
              onFileChange={(file) => onImageChange(index, file)}
            />
            <TextInput value={card.name} onChange={(e) => handleNameChange(index, e.target.value)} />
            <ActionIcon
              color="red"
              variant="light"
              onClick={() => handleRemoveService(index)}
              mt={8}
              aria-label="Удалить услугу"
              className={css.squareButton}
            >
              Удалить
            </ActionIcon>
            <div style={{ marginTop: 8 }}>
              <UpdateButton onClick={() => handleServiceSave(index)} />
            </div>
          </div>
        ))}
      </div>
      <Button onClick={handleAddService} variant="light" className={css.squareButton}>
        <IconPlus size={16} />
      </Button>
    </>
  )
}

export default Services
