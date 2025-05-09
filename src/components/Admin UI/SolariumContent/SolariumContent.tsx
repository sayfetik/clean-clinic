import { Textarea, Button, TextInput } from '@mantine/core'
import { useState, useEffect } from 'react'
import * as solariumApi from '../../../api/SolariumAPI'
import { SolariumType } from '../../../lib/types'
import MediaEditor from '../../MediaEditor/MediaEditor'
import ApplyButton from '../ApplyButton'
import BulletPoints from '../BulletPoints'
import UpdateButton from '../UpdateButton'
import css from './index.module.scss'

const SolariumContent = () => {
  const [data, setData] = useState<SolariumType | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await solariumApi.getSolarium()
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
            services: [...prev.services, { id: Date.now(), name: '', cost: 0, img: '', isNew: true }],
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
      response = await solariumApi.createSolariumService(item)
      setData((prev) =>
        prev
          ? {
              ...prev,
              services: prev.services.map((s, i) => (i === index ? { ...s, id: response.id, isNew: false } : s)),
            }
          : prev
      )
    } else {
      const formData = new FormData()
      formData.append('Id', String(item.id))
      formData.append('Name', item.name)
      formData.append('Cost', String(item.cost))
      if (item.img instanceof File) {
        formData.append('Img', item.img)
      }
      response = await solariumApi.updateSolariumService(item.id, formData)
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
    if (!data) {
      return
    }
    const index = data.services.findIndex((s) => s.id === id)
    const item = data.services[index]
    setData((prev) =>
      prev
        ? {
            ...prev,
            services: prev.services.filter((_, i) => i !== index),
          }
        : prev
    )
    if (item && item.id && item.id > 0 && !item.isNew) {
      await solariumApi.deleteSolariumService(item.id)
    }
  }

  const applyChanges = async () => {
    if (!data) {
      return
    }
    const formData = new FormData()
    formData.append('Id', String(data.id))
    formData.append('Title', data.title)
    if (typeof data.img !== 'string' && data.img) {
      formData.append('Img', data.img)
    }
    formData.append('WhatItIsTitle', data.whatItIsTitle)
    formData.append('WhatItIsText', data.whatItIsText)
    formData.append('ParagraphTitle', data.paragraphTitle)
    data.paragraph.forEach((p) => formData.append('Paragraph', p))
    formData.append('ServicesTitle', data.servicesTitle)
    formData.append('Services', data.services.map((s) => JSON.stringify(s)).join(','))
    await solariumApi.updateSolarium(data.id, formData)
  }

  return (
    <div className={css.tabContent}>
      <div className="row">
        <div className={css.content}>
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
      <TextInput
        value={data.paragraphTitle}
        onChange={(e) => setData((prev) => (prev ? { ...prev, paragraphTitle: e.target.value } : prev))}
      />
      <BulletPoints
        label=""
        bullets={data.paragraph}
        onChange={(paragraph) => setData((prev) => (prev ? { ...prev, paragraph } : prev))}
      />
      <div className="margin" />
      <TextInput
        value={data.servicesTitle}
        onChange={(e) => setData((prev) => (prev ? { ...prev, servicesTitle: e.target.value } : prev))}
      />
      <div>
        <div className={css.services}>
          {data.services.map((item, index) => (
            <div key={item.id ?? index} className={css.bulletItem}>
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
                  <TextInput
                    label="Стоимость:"
                    value={item.cost}
                    onChange={(event) => handleChangeCost(index, event.currentTarget.value)}
                  />
                  <UpdateButton onClick={() => handleSave(index)} />
                </div>
              </div>
              <Button variant="subtle" color="red" onClick={() => handleDelete(item.id)} className={css.deleteButton}>
                Удалить
              </Button>
            </div>
          ))}
        </div>
        <Button onClick={handleAdd} variant="outline">
          Добавить услугу
        </Button>
      </div>
      <ApplyButton onClick={applyChanges} />
    </div>
  )
}

export default SolariumContent
