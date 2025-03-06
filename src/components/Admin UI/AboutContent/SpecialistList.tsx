import { TextInput, Button } from '@mantine/core'
import React, { useState, useRef } from 'react'
import { about } from '../../../lib/data'
import { SpecialistType } from '../../../lib/types'
import Specialist from './Specialist'
import css from './index.module.scss'

export const SpecialistList = () => {
  const [specialists, setSpecialists] = useState<SpecialistType[]>(about.specialists) // список специалистов
  const [isAdding, setIsAdding] = useState(false) // флаг для отображения формы для добавления специалиста
  const [newSpecialist, setNewSpecialist] = useState<SpecialistType>({
    img: '',
    name: '',
    profession: '',
    experience: '',
  }) // новый специалист
  const nameRef = useRef<HTMLInputElement | null>(null) // реф для поля имени

  const addSpecialist = () => {
    setSpecialists((prev) => [...prev, newSpecialist])
    setNewSpecialist({ img: '', name: '', profession: '', experience: '' })
    setIsAdding(false)
  }

  const deleteSpecialist = (index: number) => {
    setSpecialists((prev) => prev.filter((_, i) => i !== index))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof SpecialistType) => {
    setNewSpecialist((prev) => ({
      ...prev,
      [field]: e.target.value,
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
      nameRef.current?.focus() // устанавливаем фокус на имя
    }, 0)
  }

  return (
    <div>
      <div className={css.specialists}>
        {specialists.map((specialist, index) => (
          <div key={index} className={css.specialistItem}>
            <Specialist specialist={specialist} />
            <Button className={css.deleteButton} onClick={() => deleteSpecialist(index)}>
              Удалить
            </Button>
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
