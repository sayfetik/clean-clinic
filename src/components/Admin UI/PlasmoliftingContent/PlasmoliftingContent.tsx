import { Textarea, Button, TextInput } from '@mantine/core'
import { useState, useEffect } from 'react'
import * as plasmoApi from '../../../api/PlasmoAPI'
import { PlasmoliftingType } from '../../../lib/types'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import BulletPoints from '../BulletPoints'
import UpdateButton from '../UpdateButton'
import css from './index.module.scss'

const PlasmoliftingContent = () => {
  const [data, setData] = useState<PlasmoliftingType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await plasmoApi.getPlasmo()
      setData(response)
    }
    fetchData()
  }, [])

  if (!data) {
    return null
  }

  const handleFileChange = (file: File) => {
    setData((prev) => (prev ? { ...prev, img: file } : prev))
  }

  const handleAdd = () => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            services: [...prev.services, { id: Date.now(), name: '', description: '', cost: 0, img: '', isNew: true }],
          }
        : prev
    )
  }

  const handleChangeName = (index: number, value: string) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            services: prev.services.map((item, i) => (i === index ? { ...item, name: value } : item)),
          }
        : prev
    )
  }

  const handleChangeDesc = (index: number, value: string) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            services: prev.services.map((item, i) => (i === index ? { ...item, description: value } : item)),
          }
        : prev
    )
  }

  const handleChangeCost = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) {
      return
    }
    setData((prev) =>
      prev
        ? {
            ...prev,
            services: prev.services.map((item, i) =>
              i === index ? { ...item, cost: value === '' ? 0 : Number(value) } : item
            ),
          }
        : prev
    )
  }

  const handleServiceImage = (index: number, file: File) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            services: prev.services.map((item, i) => (i === index ? { ...item, img: file } : item)),
          }
        : prev
    )
  }

  const handleSave = async (index: number) => {
    if (!data) {
      return
    }
    const item = data.services[index]
    let response: typeof item
    if (!item.id || item.id < 0 || item.isNew) {
      response = await plasmoApi.createPlasmoLiftingService(item)
      setData((prev) =>
        prev
          ? {
              ...prev,
              services: prev.services.map((s, i) => (i === index ? { ...s, isNew: false } : s)),
            }
          : prev
      )
    } else {
      const formData = new FormData()
      formData.append('Id', String(item.id))
      formData.append('Name', item.name)
      formData.append('Cost', String(item.cost))
      formData.append('Description', item.description)
      if (item.img instanceof File) {
        formData.append('NewImage', item.img)
      }
      await plasmoApi.updatePlasmoService(item.id, formData)
      setData((prev) =>
        prev
          ? {
              ...prev,
              services: prev.services.map((s, i) => (i === index ? { ...s, ...response, isNew: false } : s)),
            }
          : prev
      )
    }
  }

  const handleDelete = async (id: number) => {
    setData((prev) =>
      prev
        ? {
            ...prev,
            services: prev.services.filter((s) => s.id !== id),
          }
        : prev
    )
    await plasmoApi.deletePlasmoService(id)
  }

  const applyChanges = async () => {
    if (!data) {
      return
    }
    const formData = new FormData()
    formData.append('Id', String(data.id ?? 3))
    formData.append('Title', data.title)
    if (typeof data.img !== 'string' && data.img) {
      formData.append('Img', data.img)
    }
    formData.append('WhatItIsTitle', data.whatItIsTitle)
    formData.append('WhatItIsText', data.whatItIsText)
    formData.append('IndicationsTitle', data.indicationsTitle)
    data.indications.forEach((i) => formData.append('Indications', i))
    formData.append('ContraindicationsTitle', data.contraindicationsTitle)
    data.contraindications.forEach((i) => formData.append('Contraindications', i))
    formData.append('ServicesTitle', data.servicesTitle)
    await plasmoApi.updatePlasmoCatalog(formData)
  }

  return (
    <div className={css.tabContent}>
      <div className="row">
        <div className={css.tabContent}>
          <TextInput
            value={data.title}
            onChange={(e) => setData((prev) => (prev ? { ...prev, title: e.target.value } : prev))}
          />
          <TextInput
            value={data.whatItIsTitle}
            onChange={(e) => setData((prev) => (prev ? { ...prev, whatItIsTitle: e.target.value } : prev))}
          />
          <Textarea
            value={data.whatItIsText}
            onChange={(e) => setData((prev) => (prev ? { ...prev, whatItIsText: e.target.value } : prev))}
          />
        </div>
        <MediaEditor
          initialSrc={
            typeof data.img === 'string' ? data.img : data.img instanceof File ? URL.createObjectURL(data.img) : ''
          }
          onFileChange={handleFileChange}
        />
      </div>

      <div className="row">
        <BulletPoints
          label="Показания:"
          bullets={data.indications}
          onChange={(arr) =>
            setData((prev) =>
              prev ? { ...prev, indications: arr } : prev
            )
          }
        />
        <BulletPoints
          label="Противопоказания:"
          bullets={data.contraindications}
          onChange={(arr) =>
            setData((prev) =>
              prev ? { ...prev, contraindications: arr } : prev
            )
          }
        />
      </div>
      <ApplyButton onClick={applyChanges} />
      
      <div className="margin" />
      <TextInput
        value={data.servicesTitle}
        onChange={(e) => setData((prev) => (prev ? { ...prev, servicesTitle: e.target.value } : prev))}
      />
      <div>
        <div className={css.services}>
          {data.services.map((item, index) => (
            <div key={item.id ?? index}>
              <div className={css.bulletItem}>
                <div className={css.card}>
                  <div className={css.content}>
                    <MediaEditor
                      initialSrc={
                        typeof item.img === 'string'
                          ? item.img
                          : item.img instanceof File
                            ? URL.createObjectURL(item.img)
                            : ''
                      }
                      onFileChange={(file) => handleServiceImage(index, file)}
                    />
                    <TextInput
                      label="Название:"
                      value={item.name}
                      onChange={(event) => handleChangeName(index, event.currentTarget.value)}
                    />
                    <Textarea
                      label="Описание"
                      value={item.description}
                      onChange={(event) => handleChangeDesc(index, event.currentTarget.value)}
                    />
                    <TextInput
                      label="Стоимость:"
                      value={item.cost}
                      onChange={(event) => handleChangeCost(index, event.currentTarget.value)}
                    />
                    <UpdateButton onClick={() => handleSave(index)} />
                  </div>
                </div>
              </div>
              <Button variant="subtle" color="red" onClick={() => handleDelete(item.id)} className={css.deleteButton}>
                Удалить
              </Button>
            </div>
          ))}
        </div>
        <div className="margin" />
        <Button onClick={handleAdd} variant="outline">
          Добавить услугу
        </Button>
      </div>
    </div>
  )
}

export default PlasmoliftingContent
