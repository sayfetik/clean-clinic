import { Textarea, TextInput } from '@mantine/core'
import { useEffect, useState, useRef } from 'react'
import * as aboutPageApi from '../../../api/AboutAPI'
import { emptyAbout } from '../../../lib/empty'
import ApplyButton from '../ApplyButton'
import SpecialistList from './SpecialistList'
import css from './index.module.scss'

const AboutContent = () => {
  const [about, setAbout] = useState(emptyAbout)
  const [initialAbout, setInitialAbout] = useState(emptyAbout)
  const specialistsChanged = useRef(false)

  const normalizeSpecialists = (specialists: any[]) =>
    specialists.map((s) => ({
      ...s,
      img: s.img || s.image || '',
    }))

  useEffect(() => {
    const fetchData = async () => {
      const data = await aboutPageApi.getAboutPage()
      setAbout(data)
      setAbout((data) => ({
        ...data,
        specialists: normalizeSpecialists(data.specialists),
      }))
    }
    fetchData()
  }, [])

  const handleChange =
    (field: keyof typeof about) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAbout((prev) => ({ ...prev, [field]: e.target.value }))
    }

  // Обновление информации о специалисте
  const handleSpecialistChange = (index: number, updated: any) => {
    setAbout((prev) => {
      const specialists = [...prev.specialists]
      specialists[index] = updated
      specialistsChanged.current = true
      return { ...prev, specialists }
    })
  }

  // Добавление нового специалиста
  const handleAddSpecialist = async (newSpecialist: {
    Name: string
    Profession: string
    Experience: string
    file: File
  }) => {
    const created = await aboutPageApi.createSpecialist(newSpecialist)
    setAbout((prev) => ({
      ...prev,
      specialists: [...prev.specialists, created],
    }))
  }

  // apply: обновляет только изменённые поля
  const apply = async () => {
    // 1. Если изменились title, text1, text2
    if (
      about.title !== initialAbout.title ||
      about.text1 !== initialAbout.text1 ||
      about.text2 !== initialAbout.text2
    ) {
      await aboutPageApi.updateAbout({
        title: about.title,
        text1: about.text1,
        text2: about.text2,
      })
    }
    // 2. Если изменились специалисты (только существующие)
    if (specialistsChanged.current) {
      for (let i = 0; i < about.specialists.length; i++) {
        const curr = about.specialists[i]
        const prev = initialAbout.specialists[i]
        if (
          prev &&
          (curr.name !== prev.name ||
            curr.profession !== prev.profession ||
            curr.experience !== prev.experience ||
            curr.img !== prev.img)
        ) {
          await aboutPageApi.updateSpecialist({
            Id: curr.id,
            Name: curr.name,
            Profession: curr.profession,
            Experience: curr.experience,
            file: curr.img instanceof File ? curr.img : undefined,
          })
        }
      }
      specialistsChanged.current = false
    }
    setInitialAbout(about)
  }

  return (
    <div className={css.tabContent}>
      <TextInput value={about.title} onChange={handleChange('title')} />
      <Textarea value={about.text1} onChange={handleChange('text1')} />
      <Textarea value={about.text2} onChange={handleChange('text2')} />

      <h3 className={css.label}>Специалисты</h3>
      <SpecialistList
        specialists={about.specialists}
        onSpecialistChange={handleSpecialistChange}
        onAddSpecialist={handleAddSpecialist}
      />
      <ApplyButton onClick={apply} />
    </div>
  )
}

export default AboutContent
