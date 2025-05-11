import { Textarea, TextInput } from '@mantine/core'
import { useEffect, useState } from 'react'
import * as aboutPageApi from '../../../api/AboutAPI'
import { emptyAbout } from '../../../lib/empty'
import { SpecialistType } from '../../../lib/types'
import ApplyButton from '../ApplyButton'
import SpecialistList from './SpecialistList'
import css from './index.module.scss'

const AboutContent = () => {
  const [about, setAbout] = useState(emptyAbout)
  const [initialAbout, setInitialAbout] = useState(emptyAbout)

  const handleSpecialistsChange = (specialists: SpecialistType[]) => {
    setAbout((prev) => ({ ...prev, specialists }))
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await aboutPageApi.getAboutPage()
      setAbout(data)
      setAbout((data) => ({
        ...data,
        specialists: data.specialists,
      }))
    }
    fetchData()
  }, [])

  const handleChange =
    (field: keyof typeof about) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setAbout((prev) => ({ ...prev, [field]: e.target.value }))
    }

  const apply = async () => {
    if ( // Если изменились title, text1, text2
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
        onChange={handleSpecialistsChange}
      />
      <ApplyButton onClick={apply} />
    </div>
  )
}

export default AboutContent
