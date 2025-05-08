import { TextInput, Button, ActionIcon } from '@mantine/core'
import { IconPlus, IconX } from '@tabler/icons-react'
import MediaEditor from '../../MediaEditor/MediaEditor'
import css from './index.module.scss'

type ServiceType = {
  id: number
  name: string
  img: string | File
}

type ServicesProps = {
  services: ServiceType[]
  onChange: (services: ServiceType[]) => void
  onImageChange: (index: number, file: File) => void
}

const Services: React.FC<ServicesProps> = ({ services, onChange, onImageChange }) => {
  const handleAddService = () => {
    onChange([...services, { id: Date.now(), name: '', img: '' }])
  }

  const handleNameChange = (index: number, value: string) => {
    const updated = services.map((item, i) => (i === index ? { ...item, name: value } : item))
    onChange(updated)
  }

  const handleRemoveService = (index: number) => {
    const updated = services.filter((_, i) => i !== index)
    onChange(updated)
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
              <IconX size={18} />
            </ActionIcon>
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
