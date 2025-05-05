import { Textarea, Button, TextInput } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useState, useRef, useEffect } from 'react'
import * as cryo from '../../../api/CryotherapyAPI'
import { emptyCryotherapy } from '../../../lib/empty'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import BulletPoints from '../BulletPoints'
import css from './index.module.scss'

type CryoType = { id: number; name: string; cost: number; img: File | null | string }

const Items: React.FC<{
  items: CryoType[]
  onChange: (items: CryoType[]) => void
}> = ({ items, onChange }) => {
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  const handleAdd = () => {
    const newBullet: CryoType = {
      id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
      name: '',
      cost: 0,
      img: null,
    }
    const newBullets = [...items, newBullet]
    onChange(newBullets)
    setTimeout(() => {
      const lastIndex = newBullets.length - 1
      if (textareaRefs.current[lastIndex]) {
        textareaRefs.current[lastIndex]?.focus()
      }
    }, 0)
  }

  const handleRemove = (index: number) => {
    onChange(items.filter((_, i) => i !== index))
  }

  const handleChangeName = (index: number, value: string) => {
    const newBullets = [...items]
    newBullets[index].name = value
    onChange(newBullets)
  }

  const handleChangeCost = (index: number, value: string) => {
    const newBullets = [...items]
    newBullets[index].cost = Number(value)
    onChange(newBullets)
  }

  const handleChangeImg = (index: number, file: File) => {
    const newBullets = [...items]
    newBullets[index].img = file
    onChange(newBullets)
  }

  return (
    <div>
      <div className={css.services}>
        {items.map((item, index) => (
          <div key={index} className={css.bulletItem}>
            <div className={css.card}>
              <div className={css.content}>
                <MediaEditor
                  initialSrc={typeof item.img === 'string' ? item.img : ''}
                  onFileChange={(file) => handleChangeImg(index, file)}
                />
                <TextInput
                  label="Название:"
                  autoFocus
                  value={item.name}
                  onChange={(event) => handleChangeName(index, event.currentTarget.value)}
                />
                <TextInput
                  label="Стоимость:"
                  value={item.cost}
                  onChange={(event) => handleChangeCost(index, event.currentTarget.value)}
                />
              </div>
            </div>
            <Button variant="subtle" color="red" onClick={() => handleRemove(index)} className={css.deleteButton}>
              Удалить
            </Button>
          </div>
        ))}
      </div>
      <Button onClick={handleAdd} variant="light">
        <IconPlus size={16} />
      </Button>
    </div>
  )
}

const CryoContent = () => {
  const [data, setData] = useState(emptyCryotherapy)
  const [imgFile, setImgFile] = useState<File | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await cryo.getCryo()
      setData(response)
    }
    fetchData()
  }, [])

  // Обработчики для изменения текста
  const handleChange = (field: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const handleImgChange = (file: File) => {
    setImgFile(file)
  }

  const handleIndicationsChange = (arr: string[]) => {
    setData((prev) => ({ ...prev, indications: arr }))
  }

  const handleContraindicationsChange = (arr: string[]) => {
    setData((prev) => ({ ...prev, contraindications: arr }))
  }

  const handleServicesChange = (items: CryoType[]) => {
    setData((prev) => ({
      ...prev,
      services: items.map((item) => ({
        ...item,
        img: typeof item.img === 'string' ? item.img : '',
      })),
    }))
  }

  const applyChanges = async () => {
    const formData = new FormData()
    formData.append('Id', String(data.id ?? 0))
    formData.append('Title', data.title)
    formData.append('WhatItIsTitle', data.whatItIsTitle)
    formData.append('WhatItIsText', data.whatItIsText)
    formData.append('IndicationsTitle', data.indicationsTitle)
    data.indications.forEach((i) => formData.append('Indications', i))
    formData.append('ContraindicationsTitle', data.contraindicationsTitle)
    data.contraindications.forEach((i) => formData.append('Contraindications', i))
    formData.append('ProcedureTitle', data.procedureTitle)
    formData.append('ProcedureText', data.procedureText)
    formData.append('ServicesTitle', data.servicesTitle)
    if (imgFile) {
      formData.append('Img', imgFile)
    }
    data.services.forEach((s, idx) => {
      formData.append(`Services[${idx}].id`, String(s.id))
      formData.append(`Services[${idx}].name`, s.name)
      formData.append(`Services[${idx}].cost`, String(s.cost))
      formData.append(`Services[${idx}].img`, s.img)
    })

    await cryo.updateCryotherapy(formData)
  }

  return (
    <div className={css.tabContent}>
      <div className="row">
        <div className={css.content}>
          <TextInput value={data.title} onChange={handleChange('title')} />
          <TextInput value={data.whatItIsTitle} onChange={handleChange('whatItIsTitle')} />
          <Textarea value={data.whatItIsText} onChange={handleChange('whatItIsText')} />
        </div>
        <MediaEditor initialSrc={data.img} onFileChange={handleImgChange} />
      </div>

      <div className="row">
        <BulletPoints label="Показания:" bullets={data.indications} onChange={handleIndicationsChange} />
        <BulletPoints
          label="Противопоказания:"
          bullets={data.contraindications}
          onChange={handleContraindicationsChange}
        />
      </div>

      <TextInput value={data.procedureTitle} onChange={handleChange('procedureTitle')} />
      <Textarea value={data.procedureText} onChange={handleChange('procedureText')} />
      <div className="margin" />

      <TextInput value={data.servicesTitle} onChange={handleChange('servicesTitle')} />
      <Items items={data.services} onChange={handleServicesChange} />

      <ApplyButton onClick={applyChanges} />
    </div>
  )
}

export default CryoContent
