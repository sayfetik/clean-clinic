import { TextInput, Button } from '@mantine/core'
import React, { useState, useRef } from 'react'
import { SpecialistType } from '../../../lib/types'
import MediaEditor from '../../MediaEditor/MediaEditor'
import Specialist from './Specialist'
import css from './index.module.scss'

type Props = {
  specialists: SpecialistType[]
  onSpecialistChange: (index: number, updated: SpecialistType) => void
  onAddSpecialist: (newSpecialist: { Name: string; Profession: string; Experience: string; file: File }) => void
}

const SpecialistList: React.FC<Props> = ({ specialists, onSpecialistChange, onAddSpecialist }) => {
  const [isAdding, setIsAdding] = useState(false)
  const [newSpecialist, setNewSpecialist] = useState<{
    name: string
    profession: string
    experience: string
    file: File | null
  }>({
    name: '',
    profession: '',
    experience: '',
    file: null,
  })
  const [error, setError] = useState('')
  const nameRef = useRef<HTMLInputElement | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof newSpecialist) => {
    setNewSpecialist((prev) => ({
      ...prev,
      [field]: e.target.value,
    }))
  }

  const handleFileChange = (file: File) => {
    setNewSpecialist((prev) => ({
      ...prev,
      file,
    }))
  }

  const handleBlur = () => {
    if (!newSpecialist.name && !newSpecialist.profession && !newSpecialist.experience) {
      setIsAdding(false)
    }
  }

  const handleAddClick = () => {
    setIsAdding(true)
    setTimeout(() => {
      nameRef.current?.focus()
    }, 0)
  }

  const addSpecialist = async () => {
    setError('')
    if (
      !newSpecialist.name.trim() ||
      !newSpecialist.profession.trim() ||
      !newSpecialist.experience.trim() ||
      !newSpecialist.file
    ) {
      setError('Заполните все поля и выберите фото')
      return
    }
    await onAddSpecialist({
      Name: newSpecialist.name,
      Profession: newSpecialist.profession,
      Experience: newSpecialist.experience,
      file: newSpecialist.file,
    })
    setNewSpecialist({ name: '', profession: '', experience: '', file: null })
    setIsAdding(false)
  }

  return (
    <div>
      <div className={css.specialists}>
        {specialists.map((specialist, index) => (
          <div key={index} className={css.specialistItem}>
            <Specialist specialist={specialist} onChange={(updated) => onSpecialistChange(index, updated)} />
          </div>
        ))}
      </div>

      <div className={css.addSpecialist}>
        {isAdding ? (
          <div className={css.form} onBlur={handleBlur}>
            <TextInput
              ref={nameRef}
              label="Имя"
              value={newSpecialist.name}
              onChange={(e) => handleInputChange(e, 'name')}
            />
            <TextInput
              label="Профессия"
              value={newSpecialist.profession}
              onChange={(e) => handleInputChange(e, 'profession')}
            />
            <TextInput
              label="Опыт"
              value={newSpecialist.experience}
              onChange={(e) => handleInputChange(e, 'experience')}
            />
            {/* Используем MediaEditor для выбора файла */}
            <div style={{ margin: '10px 0' }}>
              <MediaEditor initialSrc="" onFileChange={handleFileChange} size={80} />
            </div>
            {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
            <Button onClick={addSpecialist}>Добавить</Button>
          </div>
        ) : (
          <Button onClick={handleAddClick}>+ Добавить специалиста</Button>
        )}
      </div>
    </div>
  )
}

export default SpecialistList
